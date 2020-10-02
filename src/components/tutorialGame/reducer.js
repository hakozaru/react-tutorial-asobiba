export const tutorialGameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP_NUMBER':
      return { ...state, stepNumber: action.step }
    case 'SET_X_IS_NEXT':
      return { ...state, xIsNext: action.flag }
    case 'SET_HISTORY':
      return { ...state, history: action.history }
  }
}
