import React, { useState } from 'react'
import { Board } from './Board'

export const Game = () => {
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ])

  const handleClick = (i) => {
    const targetHistory = history.slice(0, stepNumber + 1)
    const current = targetHistory[targetHistory.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'

    setStepNumber(targetHistory.length)
    setXIsNext(!xIsNext)
    setHistory(
      targetHistory.concat([
        {
          squares: squares,
        },
      ])
    )
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const moves = () => {
    return history.map((_, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    })
  }

  const status = () => {
    const winner = calculateWinner(history[stepNumber].squares)

    if (winner) {
      return 'Winner: ' + winner
    } else {
      return 'Next player: ' + (xIsNext ? 'X' : 'O')
    }
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div>{status()}</div>
        <ol>{moves()}</ol>
      </div>
    </div>
  )
}
