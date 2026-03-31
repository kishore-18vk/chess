/**
 * PieceSVG — Premium Staunton Chess Pieces
 * Highly detailed, clearly recognizable pieces
 */
import React from 'react';

const PIECE_SVGS = {

    // ════════════════════════════════════
    //  WHITE PIECES
    // ════════════════════════════════════

    /** White King — bold cross + crown + body + base */
    wK: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            {/* Cross — thick and prominent */}
            <line x1="22.5" y1="3" x2="22.5" y2="13" stroke="#000" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="17" y1="8" x2="28" y2="8" stroke="#000" strokeWidth="2.8" strokeLinecap="round" />
            {/* Crown orbs (3 dots at top of crown) */}
            <circle cx="15.5" cy="15.5" r="2.2" fill="#fff" stroke="#000" strokeWidth="1.4" />
            <circle cx="22.5" cy="13.5" r="2.2" fill="#fff" stroke="#000" strokeWidth="1.4" />
            <circle cx="29.5" cy="15.5" r="2.2" fill="#fff" stroke="#000" strokeWidth="1.4" />
            {/* Crown body (connects orbs down to body) */}
            <path
                d="M13.5 17 L13.5 25 Q22.5 22 31.5 25 L31.5 17
           Q29.5 18.5 22.5 16.5 Q15.5 18.5 13.5 17 Z"
                fill="#fff" stroke="#000" strokeWidth="1.2"
            />
            {/* Main body */}
            <path
                d="M11 25 Q11 33 22.5 36 Q34 33 34 25
           Q34 21 22.5 21 Q11 21 11 25Z"
                fill="#fff" stroke="#000" strokeWidth="1.4"
            />
            {/* Waist lines */}
            <path d="M12 28.5 Q22.5 26 33 28.5" fill="none" stroke="#000" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M11.5 32 Q22.5 29.5 33.5 32" fill="none" stroke="#000" strokeWidth="0.9" strokeLinecap="round" />
            {/* Base */}
            <rect x="9" y="36" width="27" height="2.5" rx="1.2" fill="#fff" stroke="#000" strokeWidth="1.4" />
            <rect x="7.5" y="38.5" width="30" height="2.5" rx="1.2" fill="#fff" stroke="#000" strokeWidth="1.4" />
        </svg>
    ),

    /** White Queen — orbs crown + tapered body */
    wQ: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">
                <circle cx="6" cy="12" r="2.75" />
                <circle cx="14" cy="9" r="2.75" />
                <circle cx="22.5" cy="8" r="2.75" />
                <circle cx="31" cy="9" r="2.75" />
                <circle cx="39" cy="12" r="2.75" />
                <path d="M9 26c8.5-8.5 15.5-8.5 27 0l2.5-12.5L31 25l-.3-14.1-8.2 13.4-8.2-13.5L14 25 6.5 13.5z" strokeLinecap="butt" />
                <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
                <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c4-1.5 17-1.5 21 0" fill="none" stroke="#000" />
            </g>
        </svg>
    ),

    /** White Rook */
    wR: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinejoin="miter" />
                <path d="M34 14l-3 3H14l-3-3" />
                <path d="M31 17v12.5H14V17" strokeLinejoin="miter" strokeLinecap="butt" />
                <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
                <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
            </g>
        </svg>
    ),

    /** White Bishop */
    wB: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <g fill="#fff" strokeLinecap="butt">
                    <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z" />
                    <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
                    <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                </g>
                <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
            </g>
        </svg>
    ),

    /** White Knight — detailed horse head */
    wN: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Main horse body */}
                <path
                    d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
                    fill="#fff"
                />
                {/* Head and neck */}
                <path
                    d="M 24,18
             C 24.38,20.91 18.45,25.37 16,27
             C 13,29 13.18,31.34 11,31
             C 9.958,30.06 12.41,27.96 11,28
             C 10,28 11.19,29.23 10,30
             C 9,30 5.997,29 5,24
             C 5,23 7.998,16 8,15
             C 9,12 11,10.5 13,10
             C 13,9.5 15.5,9 17,10
             C 17.5,10 19,8.5 22,10"
                    fill="#fff"
                />
                {/* Ear */}
                <path d="M 11.5,10 C 10,8 11,5.5 13.5,6 C 15,6.5 13.5,8.5 13,10" fill="#fff" />
                {/* Eye */}
                <circle cx="15" cy="12.5" r="1.8" fill="#000" stroke="none" />
                <circle cx="15.5" cy="12" r="0.6" fill="#fff" stroke="none" />
                {/* Nostril */}
                <circle cx="10.5" cy="20.5" r="0.8" fill="#000" stroke="none" />
                {/* Mane bump */}
                <path d="M 24.5,11.5 A 0.5,0.5 0 1 1 23.5,11.5 A 0.5,0.5 0 1 1 24.5,11.5 z" fill="#000" stroke="none" />
                {/* Base */}
                <path d="M 9,39 L 36,39" strokeWidth="2.8" strokeLinecap="butt" />
                {/* Base highlight */}
                <path d="M 9,36 L 36,36" strokeWidth="1.2" strokeLinecap="butt" fill="none" />
            </g>
        </svg>
    ),

    /** White Pawn */
    wP: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5H34c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
            </g>
        </svg>
    ),

    // ════════════════════════════════════
    //  BLACK PIECES
    // ════════════════════════════════════

    /** Black King — bold cross + crown + body + base */
    bK: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            {/* Cross — thick and prominent */}
            <line x1="22.5" y1="3" x2="22.5" y2="13" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="17" y1="8" x2="28" y2="8" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
            {/* Outer cross stroke */}
            <line x1="22.5" y1="3" x2="22.5" y2="13" stroke="#000" strokeWidth="4.0" strokeLinecap="round" opacity="0" />
            {/* Crown orbs */}
            <circle cx="15.5" cy="15.5" r="2.2" fill="#000" stroke="#aaa" strokeWidth="1.4" />
            <circle cx="22.5" cy="13.5" r="2.2" fill="#000" stroke="#aaa" strokeWidth="1.4" />
            <circle cx="29.5" cy="15.5" r="2.2" fill="#000" stroke="#aaa" strokeWidth="1.4" />
            {/* Crown body */}
            <path
                d="M13.5 17 L13.5 25 Q22.5 22 31.5 25 L31.5 17
           Q29.5 18.5 22.5 16.5 Q15.5 18.5 13.5 17 Z"
                fill="#000" stroke="#aaa" strokeWidth="1.2"
            />
            {/* Main body */}
            <path
                d="M11 25 Q11 33 22.5 36 Q34 33 34 25
           Q34 21 22.5 21 Q11 21 11 25Z"
                fill="#000" stroke="#aaa" strokeWidth="1.4"
            />
            {/* Waist lines */}
            <path d="M12 28.5 Q22.5 26 33 28.5" fill="none" stroke="#aaa" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M11.5 32 Q22.5 29.5 33.5 32" fill="none" stroke="#aaa" strokeWidth="0.9" strokeLinecap="round" />
            {/* Base */}
            <rect x="9" y="36" width="27" height="2.5" rx="1.2" fill="#000" stroke="#aaa" strokeWidth="1.4" />
            <rect x="7.5" y="38.5" width="30" height="2.5" rx="1.2" fill="#000" stroke="#888" strokeWidth="1.4" />
            {/* Cross lines on top of everything */}
            <line x1="22.5" y1="3" x2="22.5" y2="13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="17" y1="8" x2="28" y2="8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    ),

    /** Black Queen */
    bQ: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#000" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">
                <circle cx="6" cy="12" r="2.75" />
                <circle cx="14" cy="9" r="2.75" />
                <circle cx="22.5" cy="8" r="2.75" />
                <circle cx="31" cy="9" r="2.75" />
                <circle cx="39" cy="12" r="2.75" />
                <path d="M9 26c8.5-8.5 15.5-8.5 27 0l2.5-12.5L31 25l-.3-14.1-8.2 13.4-8.2-13.5L14 25 6.5 13.5z" strokeLinecap="butt" />
                <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
                <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c4-1.5 17-1.5 21 0" fill="none" stroke="#fff" />
            </g>
        </svg>
    ),

    /** Black Rook */
    bR: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#000" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" strokeLinejoin="miter" />
                <path d="M14 29.5v-13h17v13H14z" strokeLinejoin="miter" strokeLinecap="butt" />
                <path d="M11 14V9h4v2h5V9h5v2h5V9h4v5H11z" strokeLinejoin="miter" />
                <path d="M34 14l-3 3H14l-3-3" />
                <line x1="11" y1="14" x2="34" y2="14" fill="none" />
                <path d="M31 17v12.5" fill="none" stroke="#fff" strokeWidth=".6" />
                <path d="M14 17v12.5" fill="none" stroke="#fff" strokeWidth=".6" />
                <path d="M22.5 17v12.5" fill="none" stroke="#fff" strokeWidth=".6" />
            </g>
        </svg>
    ),

    /** Black Bishop */
    bB: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <g fill="#000" strokeLinecap="butt">
                    <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z" />
                    <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
                    <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                </g>
                <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke="#fff" strokeLinejoin="miter" />
            </g>
        </svg>
    ),

    /** Black Knight — detailed horse head */
    bN: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Main horse body */}
                <path
                    d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
                    fill="#000"
                />
                {/* Head and neck */}
                <path
                    d="M 24,18
             C 24.38,20.91 18.45,25.37 16,27
             C 13,29 13.18,31.34 11,31
             C 9.958,30.06 12.41,27.96 11,28
             C 10,28 11.19,29.23 10,30
             C 9,30 5.997,29 5,24
             C 5,23 7.998,16 8,15
             C 9,12 11,10.5 13,10
             C 13,9.5 15.5,9 17,10
             C 17.5,10 19,8.5 22,10"
                    fill="#000"
                />
                {/* Ear */}
                <path d="M 11.5,10 C 10,8 11,5.5 13.5,6 C 15,6.5 13.5,8.5 13,10" fill="#000" stroke="#777" />
                {/* Eye */}
                <circle cx="15" cy="12.5" r="1.8" fill="#fff" stroke="none" />
                <circle cx="14.5" cy="12" r="0.6" fill="#555" stroke="none" />
                {/* Nostril */}
                <circle cx="10.5" cy="20.5" r="0.8" fill="#fff" stroke="none" opacity="0.6" />
                {/* Mane bump */}
                <path d="M 24.5,11.5 A 0.5,0.5 0 1 1 23.5,11.5 A 0.5,0.5 0 1 1 24.5,11.5 z" fill="#fff" stroke="none" />
                {/* Base */}
                <path d="M 9,39 L 36,39" strokeWidth="2.8" strokeLinecap="butt" stroke="#000" />
                {/* Base highlight */}
                <path d="M 9,36 L 36,36" strokeWidth="1.2" strokeLinecap="butt" fill="none" stroke="#555" />
            </g>
        </svg>
    ),

    /** Black Pawn */
    bP: () => (
        <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <g fill="#000" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5H34c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
            </g>
        </svg>
    ),
};

function PieceSVG({ piece }) {
    const Component = PIECE_SVGS[piece];
    if (!Component) return null;
    return (
        <div className="piece-svg">
            <Component />
        </div>
    );
}

export default React.memo(PieceSVG);
