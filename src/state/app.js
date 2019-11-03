const initialState = {
  currentProject: 1,
  mainColor: '#0f0350',
}

// Action
const INCREMENT_PROJECT = 'INCREMENT_PROJECT'
export const incrementProject = currentProject => ({
  type: INCREMENT_PROJECT,
  currentProject,
})

const DECREMENT_PROJECT = 'DECREMENT_PROJECT'
export const decrementProject = currentProject => ({
  type: DECREMENT_PROJECT,
  currentProject,
})

const SET_COLOR = 'SET_COLOR'
export const setColor = mainColor => ({
  type: SET_COLOR,
  mainColor,
})

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_PROJECT: {
      const newProject = action.currentProject + 1
      return { ...state, currentProject: newProject }
    }
    case DECREMENT_PROJECT: {
      const newProject = action.currentProject - 1
      return { ...state, currentProject: newProject }
    }
    case SET_COLOR: {
      console.log('appJs maincolor :', action.mainColor)
      return { ...state, mainColor: action.mainColor }
    }
    default: {
      return state
    }
  }
}
