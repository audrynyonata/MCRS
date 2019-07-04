import { combineReducers } from 'redux'
import methodChunkReducer from './methodChunk.reducer'
import providerReducer from './provider.reducer'
import characteristicReducer from './characteristic.reducer'
import projectReducer from './project.reducer'

const rootReducer = combineReducers({
  methodChunkReducer,
  providerReducer,
  characteristicReducer,
  projectReducer
})

export default rootReducer