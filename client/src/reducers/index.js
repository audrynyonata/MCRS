import { combineReducers } from 'redux'
import methodChunkReducer from './methodChunk.reducer'
import providerReducer from './provider.reducer'
import characteristicReducer from './characteristic.reducer'

const rootReducer = combineReducers({
  methodChunkReducer,
  providerReducer,
  characteristicReducer
})

export default rootReducer