import axios from 'axios'

/*
 * action types
 */

export const ADD_METHOD_CHUNK = 'ADD_METHOD_CHUNK'
export const READ_METHOD_CHUNK = 'READ_METHOD_CHUNK'

export const FETCH_METHOD_CHUNK_BEGIN = 'FETCH_METHOD_CHUNK_BEGIN';
export const FETCH_METHOD_CHUNK_SUCCESS = 'FETCH_METHOD_CHUNK_SUCCESS';
export const FETCH_METHOD_CHUNK_FAILURE = 'FETCH_METHOD_CHUNK_FAILURE';

/*
 * action creators
 */

export const fetchMethodChunkBegin = () => ({
  type: FETCH_METHOD_CHUNK_BEGIN
})

export const fetchMethodChunkSuccess = methodChunks => ({
  type: FETCH_METHOD_CHUNK_SUCCESS,
  payload: { methodChunks }
})

export const fetchMethodChunkFailure = errors => ({
  type: FETCH_METHOD_CHUNK_FAILURE,
  payload: { errors }
})

export const addMethodChunk = methodChunk => ({
  type: ADD_METHOD_CHUNK, 
  payload: { methodChunk }
})

export const readMethodChunks = () => {
  return dispatch => {
    dispatch(fetchMethodChunkBegin());
    return axios.get('/method-chunks')
      .then(({data}) => {
        // console.log(data);
        // console.log('readMethodChunks','success');
        dispatch(fetchMethodChunkSuccess(data));
      })
      .catch(error => dispatch(fetchMethodChunkFailure(error)));
  }
}