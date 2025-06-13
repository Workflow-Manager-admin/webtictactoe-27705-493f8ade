import React, { useState } from "react";

/**
 * Main container component for WebTicTacToe.
 * Provides the game board UI, manages player move handling, and displays game status.
 * UI: modern minimalistic – simple grid layout, clear indicators, and brand color scheme.
 *
 * Colors: primary (#4CAF50), secondary (#FFC107), accent (#2196F3)
 * Theme: light
 */

// PUBLIC_INTERFACE
function TicTacToe() {
  // Game state: 3x3 array flattened, 'X', 'O', or null per square
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = board.every(Boolean) && !winner;
  const currentPlayer = isXNext ? "X" : "O";

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // Game status text
  let status;
  if (winner) {
    status = (
      <span className="ttt-status-winner" data-testid="ttt-winner">
        Winner: {winner}
      </span>
    );
  } else if (isDraw) {
    status = (
      <span className="ttt-status-draw" data-testid="ttt-draw">
        Draw!
      </span>
    );
  } else {
    status = (
      <span className="ttt-status-turn" data-testid="ttt-turn">
        Turn: <span style={{ color: currentPlayer === "X" ? "var(--primary)" : "var(--accent)" }}>{currentPlayer}</span>
      </span>
    );
  }

  return (
    <div className="ttt-root">
      <h2 className="ttt-title">WebTicTacToe</h2>
      <div className="ttt-status">{status}</div>
      <div className="ttt-board" data-testid="ttt-board">
        {board.map((val, idx) => (
          <button
            className={`ttt-square${val ? " filled" : ""}`}
            style={{
              color: val === "X" ? "var(--primary)" : val === "O" ? "var(--accent)" : undefined,
            }}
            key={idx}
            onClick={() => handleSquareClick(idx)}
            disabled={Boolean(val) || Boolean(winner)}
            data-testid={`ttt-square-${idx}`}
          >
            {val}
          </button>
        ))}
      </div>
      <button className="ttt-restart" onClick={handleRestart} data-testid="ttt-restart">
        Restart Game
      </button>
    </div>
  );
}

// Game winner logic: Returns 'X', 'O', or null
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
