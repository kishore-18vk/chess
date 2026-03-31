/**
 * Chess Engine — Complete implementation of chess rules
 * Handles: piece movement, check, checkmate, stalemate,
 * castling, en passant, pawn promotion, 50-move rule,
 * threefold repetition, insufficient material
 */

// Piece constants
export const PIECES = {
    EMPTY: null,
    // White pieces
    wP: 'wP', wR: 'wR', wN: 'wN', wB: 'wB', wQ: 'wQ', wK: 'wK',
    // Black pieces
    bP: 'bP', bR: 'bR', bN: 'bN', bB: 'bB', bQ: 'bQ', bK: 'bK',
};

export const COLOR = { WHITE: 'w', BLACK: 'b' };

/** Initial board position */
export const INITIAL_BOARD = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
];

/** Return piece color: 'w' or 'b' */
export function pieceColor(piece) {
    if (!piece) return null;
    return piece[0]; // first char is 'w' or 'b'
}

/** Return piece type: P, R, N, B, Q, K */
export function pieceType(piece) {
    if (!piece) return null;
    return piece[1];
}

/** Deep clone the board */
export function cloneBoard(board) {
    return board.map(row => [...row]);
}

/** Create initial game state */
export function createInitialState() {
    return {
        board: INITIAL_BOARD.map(row => [...row]),
        currentTurn: COLOR.WHITE,
        castlingRights: {
            wK: true, wQ: true,  // white king-side, queen-side
            bK: true, bQ: true,  // black king-side, queen-side
        },
        enPassantTarget: null, // square where en passant capture is possible {row, col}
        halfMoveClock: 0,      // for 50-move rule
        fullMoveNumber: 1,
        history: [],           // array of move objects
        positionHistory: [],   // for threefold repetition
        capturedPieces: { w: [], b: [] },
        gameStatus: 'playing', // 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw'
        drawReason: null,
        winner: null,
        promotionPending: null,// {from, to, color} when promotion needed
    };
}

/** Get algebraic notation for a square */
export function squareToAlgebraic(row, col) {
    const files = 'abcdefgh';
    const ranks = '87654321';
    return files[col] + ranks[row];
}

/** Parse algebraic to {row, col} */
export function algebraicToSquare(alg) {
    const files = 'abcdefgh';
    const ranks = '87654321';
    return { col: files.indexOf(alg[0]), row: ranks.indexOf(alg[1]) };
}

/** Check if coordinates are within board bounds */
export function inBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

/** Find king position for the given color */
export function findKing(board, color) {
    const kingPiece = color + 'K';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] === kingPiece) return { row: r, col: c };
        }
    }
    return null;
}

/** Check if a square is attacked by any piece of 'attackerColor' */
export function isSquareAttacked(board, row, col, attackerColor) {
    const defenderColor = attackerColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;

    // Check pawn attacks
    const pawnDir = attackerColor === COLOR.WHITE ? 1 : -1; // white pawns attack upward (row decreases from perspective)
    // From the target square, look in pawn attack directions where attacker's pawns would come from
    const pawnRows = [row + pawnDir]; // the row where an attacker's pawn must be
    const pawnCols = [col - 1, col + 1];
    for (const pr of pawnRows) {
        for (const pc of pawnCols) {
            if (inBounds(pr, pc)) {
                const p = board[pr][pc];
                if (p && pieceColor(p) === attackerColor && pieceType(p) === 'P') return true;
            }
        }
    }

    // Check knight attacks
    const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    for (const [dr, dc] of knightMoves) {
        const nr = row + dr, nc = col + dc;
        if (inBounds(nr, nc)) {
            const p = board[nr][nc];
            if (p && pieceColor(p) === attackerColor && pieceType(p) === 'N') return true;
        }
    }

    // Check rook/queen attacks (horizontal/vertical)
    const straightDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of straightDirs) {
        let nr = row + dr, nc = col + dc;
        while (inBounds(nr, nc)) {
            const p = board[nr][nc];
            if (p) {
                if (pieceColor(p) === attackerColor && (pieceType(p) === 'R' || pieceType(p) === 'Q')) return true;
                break;
            }
            nr += dr; nc += dc;
        }
    }

    // Check bishop/queen attacks (diagonal)
    const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dr, dc] of diagDirs) {
        let nr = row + dr, nc = col + dc;
        while (inBounds(nr, nc)) {
            const p = board[nr][nc];
            if (p) {
                if (pieceColor(p) === attackerColor && (pieceType(p) === 'B' || pieceType(p) === 'Q')) return true;
                break;
            }
            nr += dr; nc += dc;
        }
    }

    // Check king attacks
    const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (const [dr, dc] of kingMoves) {
        const nr = row + dr, nc = col + dc;
        if (inBounds(nr, nc)) {
            const p = board[nr][nc];
            if (p && pieceColor(p) === attackerColor && pieceType(p) === 'K') return true;
        }
    }

    return false;
}

/** Check if the king of 'color' is in check */
export function isInCheck(board, color) {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    const attackerColor = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
    return isSquareAttacked(board, kingPos.row, kingPos.col, attackerColor);
}

/**
 * Get all pseudo-legal moves for a piece at (fromRow, fromCol)
 * (does not check if king is left in check)
 */
export function getPseudoLegalMoves(board, fromRow, fromCol, enPassantTarget, castlingRights) {
    const piece = board[fromRow][fromCol];
    if (!piece) return [];

    const color = pieceColor(piece);
    const type = pieceType(piece);
    const moves = [];
    const oppColor = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;

    const addMove = (toRow, toCol, special = null) => {
        moves.push({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol }, special });
    };

    switch (type) {
        case 'P': {
            const dir = color === COLOR.WHITE ? -1 : 1; // white moves up (decreasing row), black moves down
            const startRow = color === COLOR.WHITE ? 6 : 1;
            const promotionRow = color === COLOR.WHITE ? 0 : 7;

            // Forward move
            const nr = fromRow + dir;
            if (inBounds(nr, fromCol) && !board[nr][fromCol]) {
                addMove(nr, fromCol, nr === promotionRow ? 'promotion' : null);
                // Double push from start
                if (fromRow === startRow && !board[nr + dir]?.[fromCol]) {
                    addMove(nr + dir, fromCol, 'double-push');
                }
            }

            // Diagonal captures
            for (const dc of [-1, 1]) {
                const nc = fromCol + dc;
                if (inBounds(nr, nc)) {
                    const target = board[nr][nc];
                    if (target && pieceColor(target) === oppColor) {
                        addMove(nr, nc, nr === promotionRow ? 'promotion' : null);
                    }
                    // En passant
                    if (enPassantTarget && nr === enPassantTarget.row && nc === enPassantTarget.col) {
                        addMove(nr, nc, 'en-passant');
                    }
                }
            }
            break;
        }

        case 'N': {
            const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
            for (const [dr, dc] of knightMoves) {
                const nr = fromRow + dr, nc = fromCol + dc;
                if (inBounds(nr, nc) && pieceColor(board[nr][nc]) !== color) {
                    addMove(nr, nc);
                }
            }
            break;
        }

        case 'B': {
            const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            for (const [dr, dc] of dirs) {
                let nr = fromRow + dr, nc = fromCol + dc;
                while (inBounds(nr, nc)) {
                    if (board[nr][nc]) {
                        if (pieceColor(board[nr][nc]) !== color) addMove(nr, nc);
                        break;
                    }
                    addMove(nr, nc);
                    nr += dr; nc += dc;
                }
            }
            break;
        }

        case 'R': {
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                let nr = fromRow + dr, nc = fromCol + dc;
                while (inBounds(nr, nc)) {
                    if (board[nr][nc]) {
                        if (pieceColor(board[nr][nc]) !== color) addMove(nr, nc);
                        break;
                    }
                    addMove(nr, nc);
                    nr += dr; nc += dc;
                }
            }
            break;
        }

        case 'Q': {
            const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of dirs) {
                let nr = fromRow + dr, nc = fromCol + dc;
                while (inBounds(nr, nc)) {
                    if (board[nr][nc]) {
                        if (pieceColor(board[nr][nc]) !== color) addMove(nr, nc);
                        break;
                    }
                    addMove(nr, nc);
                    nr += dr; nc += dc;
                }
            }
            break;
        }

        case 'K': {
            const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            for (const [dr, dc] of dirs) {
                const nr = fromRow + dr, nc = fromCol + dc;
                if (inBounds(nr, nc) && pieceColor(board[nr][nc]) !== color) {
                    addMove(nr, nc);
                }
            }

            // Castling
            const castleRow = color === COLOR.WHITE ? 7 : 0;
            const attackerColor = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;

            if (fromRow === castleRow && fromCol === 4 && !isSquareAttacked(board, castleRow, 4, attackerColor)) {
                // King-side castling
                if (castlingRights[color + 'K'] &&
                    !board[castleRow][5] && !board[castleRow][6] &&
                    !isSquareAttacked(board, castleRow, 5, attackerColor) &&
                    !isSquareAttacked(board, castleRow, 6, attackerColor)) {
                    addMove(castleRow, 6, 'castle-kingside');
                }
                // Queen-side castling
                if (castlingRights[color + 'Q'] &&
                    !board[castleRow][3] && !board[castleRow][2] && !board[castleRow][1] &&
                    !isSquareAttacked(board, castleRow, 3, attackerColor) &&
                    !isSquareAttacked(board, castleRow, 2, attackerColor)) {
                    addMove(castleRow, 2, 'castle-queenside');
                }
            }
            break;
        }
    }

    return moves;
}

/**
 * Apply a move to the board (returns new board state without mutating)
 * Returns { board, enPassantTarget, castlingRights, captured, promotionPending }
 */
export function applyMove(board, move, castlingRights, promotionPiece = null) {
    const newBoard = cloneBoard(board);
    const { from, to, special } = move;
    const piece = newBoard[from.row][from.col];
    const color = pieceColor(piece);
    const type = pieceType(piece);
    let captured = newBoard[to.row][to.col];
    let newEnPassantTarget = null;
    let newCastlingRights = { ...castlingRights };
    let promotionPending = null;

    // Move the piece
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;

    // Handle special moves
    if (special === 'en-passant') {
        const capturedPawnRow = from.row; // en passant captured pawn is on same row as moving pawn
        captured = newBoard[capturedPawnRow][to.col];
        newBoard[capturedPawnRow][to.col] = null;
    }

    if (special === 'double-push') {
        // Set en passant target square (the square the pawn skipped over)
        const epRow = (from.row + to.row) / 2;
        newEnPassantTarget = { row: epRow, col: from.col };
    }

    if (special === 'castle-kingside') {
        const rookCol = 7;
        newBoard[from.row][5] = newBoard[from.row][rookCol];
        newBoard[from.row][rookCol] = null;
    }

    if (special === 'castle-queenside') {
        const rookCol = 0;
        newBoard[from.row][3] = newBoard[from.row][rookCol];
        newBoard[from.row][rookCol] = null;
    }

    if (special === 'promotion') {
        if (promotionPiece) {
            newBoard[to.row][to.col] = color + promotionPiece;
        } else {
            // Promotion pending
            promotionPending = { row: to.row, col: to.col, color };
        }
    }

    // Update castling rights
    if (type === 'K') {
        newCastlingRights[color + 'K'] = false;
        newCastlingRights[color + 'Q'] = false;
    }
    if (type === 'R') {
        if (from.col === 7) newCastlingRights[color + 'K'] = false;
        if (from.col === 0) newCastlingRights[color + 'Q'] = false;
    }
    // If a rook is captured
    if (captured && pieceType(captured) === 'R') {
        const capturedColor = pieceColor(captured);
        if (to.col === 7) newCastlingRights[capturedColor + 'K'] = false;
        if (to.col === 0) newCastlingRights[capturedColor + 'Q'] = false;
    }

    return {
        board: newBoard,
        enPassantTarget: newEnPassantTarget,
        castlingRights: newCastlingRights,
        captured,
        promotionPending,
    };
}

/**
 * Get all LEGAL moves for a piece (filters out moves that leave king in check)
 */
export function getLegalMoves(board, fromRow, fromCol, enPassantTarget, castlingRights, currentTurn) {
    const piece = board[fromRow][fromCol];
    if (!piece || pieceColor(piece) !== currentTurn) return [];

    const pseudoMoves = getPseudoLegalMoves(board, fromRow, fromCol, enPassantTarget, castlingRights);
    const legalMoves = [];

    for (const move of pseudoMoves) {
        const { board: newBoard } = applyMove(board, move, castlingRights);
        if (!isInCheck(newBoard, currentTurn)) {
            legalMoves.push(move);
        }
    }

    return legalMoves;
}

/**
 * Get ALL legal moves for a color
 */
export function getAllLegalMoves(board, color, enPassantTarget, castlingRights) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] && pieceColor(board[r][c]) === color) {
                const pieceMoves = getLegalMoves(board, r, c, enPassantTarget, castlingRights, color);
                moves.push(...pieceMoves);
            }
        }
    }
    return moves;
}

/** Detect game over conditions */
export function detectGameStatus(board, color, enPassantTarget, castlingRights, halfMoveClock, positionHistory) {
    const allMoves = getAllLegalMoves(board, color, enPassantTarget, castlingRights);
    const inCheck = isInCheck(board, color);

    if (allMoves.length === 0) {
        if (inCheck) {
            const winner = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
            return { status: 'checkmate', winner };
        } else {
            return { status: 'stalemate', winner: null };
        }
    }

    if (inCheck) return { status: 'check', winner: null };

    // 50-move rule
    if (halfMoveClock >= 100) { // 50 moves = 100 half-moves
        return { status: 'draw', drawReason: '50-move rule', winner: null };
    }

    // Threefold repetition
    const currentPos = boardToFENPosition(board, color, castlingRights, enPassantTarget);
    const posCount = positionHistory.filter(p => p === currentPos).length;
    if (posCount >= 2) { // current position would be the 3rd occurrence
        return { status: 'draw', drawReason: 'threefold repetition', winner: null };
    }

    // Insufficient material
    if (isInsufficientMaterial(board)) {
        return { status: 'draw', drawReason: 'insufficient material', winner: null };
    }

    return { status: 'playing', winner: null };
}

/** Check insufficient material */
export function isInsufficientMaterial(board) {
    const pieces = { w: [], b: [] };
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (p) {
                const color = pieceColor(p);
                const type = pieceType(p);
                if (type !== 'K') pieces[color].push({ type, row: r, col: c });
            }
        }
    }

    const w = pieces.w, b = pieces.b;

    // King vs King
    if (w.length === 0 && b.length === 0) return true;

    // King + minor piece vs King
    if (w.length === 0 && b.length === 1 && (b[0].type === 'N' || b[0].type === 'B')) return true;
    if (b.length === 0 && w.length === 1 && (w[0].type === 'N' || w[0].type === 'B')) return true;

    // King + Bishop vs King + Bishop (same color squares)
    if (w.length === 1 && b.length === 1 && w[0].type === 'B' && b[0].type === 'B') {
        const wSquareColor = (w[0].row + w[0].col) % 2;
        const bSquareColor = (b[0].row + b[0].col) % 2;
        if (wSquareColor === bSquareColor) return true;
    }

    return false;
}

/** Simplified FEN-like position string for repetition detection */
export function boardToFENPosition(board, turn, castlingRights, enPassantTarget) {
    const boardStr = board.map(row => row.map(p => p || '.').join('')).join('/');
    const ep = enPassantTarget ? squareToAlgebraic(enPassantTarget.row, enPassantTarget.col) : '-';
    const castle = ['wK', 'wQ', 'bK', 'bQ'].map(k => castlingRights[k] ? k : '').join('');
    return `${boardStr}|${turn}|${castle}|${ep}`;
}

/** Generate move notation (algebraic) */
export function generateMoveNotation(board, move, isCapture, isCheck, isCheckmate, promotionPiece) {
    const { from, to, special } = move;
    const piece = board[from.row][from.col];
    const type = pieceType(piece);

    if (special === 'castle-kingside') return isCheckmate ? 'O-O#' : isCheck ? 'O-O+' : 'O-O';
    if (special === 'castle-queenside') return isCheckmate ? 'O-O-O#' : isCheck ? 'O-O-O+' : 'O-O-O';

    const files = 'abcdefgh';
    const ranks = '87654321';
    let notation = '';

    if (type !== 'P') notation += type;
    else if (isCapture || special === 'en-passant') notation += files[from.col];

    if (isCapture || special === 'en-passant') notation += 'x';

    notation += files[to.col] + ranks[to.row];

    if (special === 'promotion' && promotionPiece) {
        notation += '=' + promotionPiece;
    }

    if (isCheckmate) notation += '#';
    else if (isCheck) notation += '+';

    return notation;
}

/**
 * Apply a full game move with all state updates
 */
export function makeMove(gameState, from, to, promotionPiece = null) {
    const { board, currentTurn, castlingRights, enPassantTarget, halfMoveClock,
        fullMoveNumber, history, positionHistory, capturedPieces } = gameState;

    const piece = board[from.row][from.col];
    if (!piece || pieceColor(piece) !== currentTurn) return null;

    // Find the legal move
    const legalMoves = getLegalMoves(board, from.row, from.col, enPassantTarget, castlingRights, currentTurn);
    const move = legalMoves.find(m => m.to.row === to.row && m.to.col === to.col);
    if (!move) return null;

    // Check if promotion piece is needed
    if (move.special === 'promotion' && !promotionPiece) {
        return { ...gameState, promotionPending: { from, to, color: currentTurn } };
    }

    const result = applyMove(board, move, castlingRights, promotionPiece);
    const newBoard = result.board;
    const captured = result.captured;

    // Update captured pieces
    const newCaptured = {
        w: [...capturedPieces.w],
        b: [...capturedPieces.b],
    };
    if (captured) {
        const capColor = pieceColor(captured);
        newCaptured[capColor].push(captured);
    }
    // En passant captured piece not in 'captured' yet
    if (move.special === 'en-passant') {
        newCaptured[currentTurn === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE].push(currentTurn + 'P');
    }

    // Half move clock (reset on pawn move or capture)
    const isPawnMove = pieceType(piece) === 'P';
    const isCapture = !!captured || move.special === 'en-passant';
    const newHalfMoveClock = (isPawnMove || isCapture) ? 0 : halfMoveClock + 1;

    const nextTurn = currentTurn === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
    const newFullMoveNumber = currentTurn === COLOR.BLACK ? fullMoveNumber + 1 : fullMoveNumber;

    // Check game status for the NEXT player
    const gameResult = detectGameStatus(
        newBoard, nextTurn, result.enPassantTarget,
        result.castlingRights, newHalfMoveClock, positionHistory
    );

    const isCheck = gameResult.status === 'check' || gameResult.status === 'checkmate';
    const isCheckmate = gameResult.status === 'checkmate';

    // Generate notation
    const notation = generateMoveNotation(board, move, isCapture, isCheck, isCheckmate, promotionPiece);

    // Current position for repetition
    const posStr = boardToFENPosition(newBoard, nextTurn, result.castlingRights, result.enPassantTarget);

    const newHistory = [...history, {
        move,
        notation,
        piece,
        captured,
        board: newBoard,
        from,
        to,
        special: move.special,
        promotionPiece,
    }];

    return {
        board: newBoard,
        currentTurn: nextTurn,
        castlingRights: result.castlingRights,
        enPassantTarget: result.enPassantTarget,
        halfMoveClock: newHalfMoveClock,
        fullMoveNumber: newFullMoveNumber,
        history: newHistory,
        positionHistory: [...positionHistory, posStr],
        capturedPieces: newCaptured,
        gameStatus: gameResult.status === 'draw' ? 'draw' :
            gameResult.status === 'checkmate' ? 'checkmate' :
                gameResult.status === 'stalemate' ? 'stalemate' :
                    gameResult.status === 'check' ? 'check' : 'playing',
        drawReason: gameResult.drawReason || null,
        winner: gameResult.winner,
        promotionPending: null,
    };
}

/** Undo last move */
export function undoMove(gameState) {
    const { history, capturedPieces, positionHistory } = gameState;
    if (history.length === 0) return gameState;

    // Remove last history entry and rebuild from previous state
    const newHistory = history.slice(0, -1);

    if (newHistory.length === 0) {
        // Reset to initial state
        const fresh = createInitialState();
        return { ...fresh, capturedPieces: { w: [], b: [] } };
    }

    // Rebuild state by replaying all moves
    let state = createInitialState();
    for (const h of newHistory) {
        state = makeMove(state, h.from, h.to, h.promotionPiece) || state;
    }
    return state;
}

/** Redo - returns next state from redo stack */
export function redoMove(gameState, redoStack) {
    if (redoStack.length === 0) return { gameState, redoStack };
    const [next, ...remainingRedo] = redoStack;
    const newState = makeMove(gameState, next.from, next.to, next.promotionPiece) || gameState;
    return { gameState: newState, redoStack: remainingRedo };
}

/**
 * ============================================
 * MINIMAX AI ENGINE
 * ============================================
 */

// Piece value tables for evaluation
const PIECE_VALUES = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000 };

// Piece-square tables (from white's perspective)
const PST = {
    P: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    N: [
        [-50, -40, -30, -30, -30, -30, -40, -50],
        [-40, -20, 0, 0, 0, 0, -20, -40],
        [-30, 0, 10, 15, 15, 10, 0, -30],
        [-30, 5, 15, 20, 20, 15, 5, -30],
        [-30, 0, 15, 20, 20, 15, 0, -30],
        [-30, 5, 10, 15, 15, 10, 5, -30],
        [-40, -20, 0, 5, 5, 0, -20, -40],
        [-50, -40, -30, -30, -30, -30, -40, -50],
    ],
    B: [
        [-20, -10, -10, -10, -10, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 5, 10, 10, 5, 0, -10],
        [-10, 5, 5, 10, 10, 5, 5, -10],
        [-10, 0, 10, 10, 10, 10, 0, -10],
        [-10, 10, 10, 10, 10, 10, 10, -10],
        [-10, 5, 0, 0, 0, 0, 5, -10],
        [-20, -10, -10, -10, -10, -10, -10, -20],
    ],
    R: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 10, 10, 10, 10, 10, 10, 5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [0, 0, 0, 5, 5, 0, 0, 0],
    ],
    Q: [
        [-20, -10, -10, -5, -5, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 5, 5, 5, 5, 0, -10],
        [-5, 0, 5, 5, 5, 5, 0, -5],
        [0, 0, 5, 5, 5, 5, 0, -5],
        [-10, 5, 5, 5, 5, 5, 0, -10],
        [-10, 0, 5, 0, 0, 0, 0, -10],
        [-20, -10, -10, -5, -5, -10, -10, -20],
    ],
    K: [
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-20, -30, -30, -40, -40, -30, -30, -20],
        [-10, -20, -20, -20, -20, -20, -20, -10],
        [20, 20, 0, 0, 0, 0, 20, 20],
        [20, 30, 10, 0, 0, 10, 30, 20],
    ],
};

/** Evaluate board position from white's perspective */
function evaluateBoard(board) {
    let score = 0;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (!p) continue;
            const color = pieceColor(p);
            const type = pieceType(p);
            const val = PIECE_VALUES[type] || 0;
            // PST: white uses row as-is (0=rank 8), black mirrors
            const pstRow = color === COLOR.WHITE ? r : 7 - r;
            const pstVal = PST[type] ? PST[type][pstRow][c] : 0;
            if (color === COLOR.WHITE) score += val + pstVal;
            else score -= val + pstVal;
        }
    }
    return score;
}

/** Minimax with alpha-beta pruning */
function minimax(board, depth, alpha, beta, maximizing, color, enPassantTarget, castlingRights) {
    if (depth === 0) return evaluateBoard(board);

    const moves = getAllLegalMoves(board, color, enPassantTarget, castlingRights);
    if (moves.length === 0) {
        if (isInCheck(board, color)) {
            return maximizing ? -100000 : 100000;
        }
        return 0; // stalemate
    }

    const nextColor = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;

    if (maximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            const result = applyMove(board, move, castlingRights, 'Q'); // auto-promote to Queen for AI
            const evalScore = minimax(result.board, depth - 1, alpha, beta, false, nextColor, result.enPassantTarget, result.castlingRights);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            const result = applyMove(board, move, castlingRights, 'Q');
            const evalScore = minimax(result.board, depth - 1, alpha, beta, true, nextColor, result.enPassantTarget, result.castlingRights);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

/** Get best move for AI */
export function getBestMove(board, color, enPassantTarget, castlingRights, depth = 3) {
    const moves = getAllLegalMoves(board, color, enPassantTarget, castlingRights);
    if (moves.length === 0) return null;

    const maximizing = color === COLOR.WHITE;
    let bestMove = null;
    let bestScore = maximizing ? -Infinity : Infinity;

    for (const move of moves) {
        const result = applyMove(board, move, castlingRights, 'Q');
        const nextColor = color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
        const score = minimax(result.board, depth - 1, -Infinity, Infinity, !maximizing, nextColor, result.enPassantTarget, result.castlingRights);

        if (maximizing ? score > bestScore : score < bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}
