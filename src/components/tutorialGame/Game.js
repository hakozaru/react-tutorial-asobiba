import React, { useReducer } from 'react'
import { Board } from './Board'
import { tutorialGameReducer } from './reducer'

export const Game = () => {
  const initialState = {
    stepNumber: 0,
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  }

  const [state, dispatch] = useReducer(tutorialGameReducer, initialState)

  const handleClick = (i) => {
    const targetHistory = state.history.slice(0, state.stepNumber + 1)
    const current = targetHistory[targetHistory.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = state.xIsNext ? 'X' : 'O'

    dispatch({
      type: 'SET_STEP_NUMBER',
      step: targetHistory.length,
    })
    dispatch({
      type: 'SET_X_IS_NEXT',
      flag: !state.xIsNext,
    })
    dispatch({
      type: 'SET_HISTORY',
      history: targetHistory.concat([
        {
          squares: squares,
        },
      ]),
    })
  }

  const jumpTo = (step) => {
    dispatch({
      type: 'SET_STEP_NUMBER',
      step: step,
    })
    dispatch({
      type: 'SET_X_IS_NEXT',
      flag: step % 2 === 0,
    })
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
    return state.history.map((_, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    })
  }

  const status = () => {
    const winner = calculateWinner(state.history[state.stepNumber].squares)

    if (winner) {
      return 'Winner: ' + winner
    } else {
      return 'Next player: ' + (state.xIsNext ? 'X' : 'O')
    }
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={state.history[state.stepNumber].squares}
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
