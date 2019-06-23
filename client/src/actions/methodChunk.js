/*
 * action types
 */

export const ADD_METHOD_CHUNK = 'ADD_METHOD_CHUNK'

/*
 * action creators
 */

export const addMethodChunk = (methodChunk) => {
  return { type: ADD_METHOD_CHUNK, methodChunk }
}