import { combineReducers } from "redux";
import methodChunks from "./methodChunk.reducer";
import providerReducer from "./provider.reducer";
import characteristics from "./characteristic.reducer";
import projectReducer from "./project.reducer";

const rootReducer = combineReducers({
  methodChunks,
  providerReducer,
  characteristics,
  projectReducer
});

export default rootReducer;
