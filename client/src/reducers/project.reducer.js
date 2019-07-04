import {
  ADD_PROJECT, READ_PROJECT, FETCH_PROJECT_BEGIN, FETCH_PROJECT_FAILURE, FETCH_PROJECT_SUCCESS
} from '../actions'

const initialState = {
  projects: []
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        projects: [...state.projects, action.payload.project]
      }
    case READ_PROJECT:
      return state
    case FETCH_PROJECT_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      }
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload.projects
      }
    case FETCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        projects: []
      }
    default:
      return state
  }
}

export default projectReducer