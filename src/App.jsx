import { useState } from "react";

import O from "./assets/O.svg";
import X from "./assets/X.svg";
import Owin from "./assets/Owin.svg";
import Xwin from "./assets/xwin.svg";

function Square({ value, onSquareClick, ClassParam, Winner }) {
  return (
    <button
      className={`border border-black/0 w-[100px] h-[100px] flex justify-center items-center ${
        Winner ? (value === Winner ? "bg-[#DAFAFF]" : "") : ""
      } ${ClassParam}`}
      onClick={onSquareClick}
    >
      <img className={value === "O" ? "" : "hidden"} src={O} alt="" />
      <img className={value === "X" ? "" : "hidden"} src={X} alt="" />
    </button>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  if (squares.every((item) => item !== null) && !calculateWinner(squares)) {
    setTimeout(() => {}, 2000);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen gap-30">
      <h1 className="text-4xl font-bold">TicTacToe</h1>
      <div className="flex shadow-2xl w-fit p-4 outline-black/10 rounded-lg">
        <div className="grid">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            Winner={winner}
          />
          <Square
            ClassParam={"border-y-black/30"}
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            Winner={winner}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            Winner={winner}
          />
        </div>
        <div className="grid">
          <Square
            ClassParam={"border-x-black/30"}
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            Winner={winner}
          />
          <Square
            ClassParam={"border-y-black/30 border-x-black/30"}
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            Winner={winner}
          />
          <Square
            ClassParam={"border-x-black/30"}
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            Winner={winner}
          />
        </div>
        <div className="grid">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            Winner={winner}
          />
          <Square
            ClassParam={"border-y-black/30"}
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            Winner={winner}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            Winner={winner}
          />
        </div>
      </div>
      <div
        className={`flex justify-center items-center gap-5 outline ${
          winner === "X" ? "outline-[#3B8AD5]" : "outline-[#30BDD1]"
        } rounded-full px-10 py-5 bg-white ${winner ? "" : "hidden"}`}
      >
        <img src={winner === "X" ? Xwin : winner === "O" ? Owin : ""} alt="" />
        <p className="text-2xl font-semibold">Wins !</p>
      </div>
    </main>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
