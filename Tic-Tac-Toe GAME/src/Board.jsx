import { useState, useEffect } from 'react'
import Cell from './component/Cell';
import WinTone from './tone/winTone.wav';
import clickTone from './tone/clickTone.wav'
import './App.css'

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [WinCounterX, setCountX] = useState(0)
  const [WinCounterO, setCountO] = useState(0)
  const [xIsNext, setXIsNext] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setDrawState] = useState(false);
  const winningCombination = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ];

  useEffect(() => {
    const firstChance = Math.random() > 0.5;
    setXIsNext(firstChance);
  }, []);

  function checkWinner(squares) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a])
        console.log(combination);
        squares[a] === 'X' ? setCountX(WinCounterX + 1) : setCountO(WinCounterO + 1)

        return { win: squares[a], combination };
      }
    }
    return null;
  }

  function handleClick(index) {
    if (squares[index]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    playClickedButton();
    const Winner = checkWinner(newSquares);
    if (Winner) {
      setWinningLine(Winner);
      console.log(Winner);
      playWinTone();
    } else if (!newSquares.includes(null)) {
      setDrawState(true);
    }
  }

  const playClickedButton = () => {
    const click = new Audio(clickTone)
    click.play();
  }

  const playWinTone = () => {
    const tone = new Audio(WinTone);
    tone.play();
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setWinningLine(null);
    setXIsNext(true);
    setDrawState(false);
  }

  return (
    <>
      <div className="status">
        <h1>
          {winningLine ? `Winner: ${winningLine.win}` : isDraw ? "It's a draw! better luck next time" : `Player ${xIsNext ? 'X' : 'O'} Your Turn`}
        </h1>
      </div>
      <div className="box">
        <div className="player-stats">
          <div className="player-x">
            X wins: <br />
            {WinCounterX}
          </div>
          <h2>V</h2>
          <div className="player-o">
            O wins: <br />
            {WinCounterO}
          </div>
        </div>
        <div className="board-row">
          {
            squares.map((value, index) => (
              <Cell
                key={index}
                value={value}
                onClick={() => handleClick(index)}
                isWinningCell={winningLine && winningLine.combination.includes(index)}
              />
            ))
          }
        </div>
      </div>
      <div className="restart">
        {(winningLine || isDraw) && <button onClick={handleRestart}>Restart Game</button>}
      </div>
    </>
  );
}
