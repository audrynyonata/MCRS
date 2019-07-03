import { combineReducers } from 'redux'
import methodChunkReducer from './methodChunk.reducer'
import providerReducer from './provider.reducer'

const rootReducer = combineReducers({
  methodChunkReducer,
  providerReducer
})

export default rootReducer