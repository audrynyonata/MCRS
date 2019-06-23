import {
  ADD_METHOD_CHUNK
} from '../actions/methodChunk'

const methodChunkReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_METHOD_CHUNK:
      return [
        ...state,
        action.methodChunk
      ]
    default:
      return state
  }
}

export default methodChunkReducer