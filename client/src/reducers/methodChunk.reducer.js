import {
  ADD_METHOD_CHUNK,
  READ_METHOD_CHUNK,
  FETCH_METHOD_CHUNK_BEGIN,
  FETCH_METHOD_CHUNK_FAILURE,
  FETCH_METHOD_CHUNK_SUCCESS
} from "../actions";

const initialState = {
  methodChunks: []
};

const methodChunkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_METHOD_CHUNK:
      return {
        ...state,
        methodChunks: [...state.methodChunks, action.payload.methodChunk]
      };
    case READ_METHOD_CHUNK:
      return state;
    case FETCH_METHOD_CHUNK_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_METHOD_CHUNK_SUCCESS:
      return {
        ...state,
        loading: false,
        methodChunks: action.payload.methodChunks
      };
    case FETCH_METHOD_CHUNK_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        methodChunks: []
      };
    default:
      return state;
  }
};

export default methodChunkReducer;
