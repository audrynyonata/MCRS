import { combineReducers } from "redux";
import methodChunks from "./methodChunk.reducer";
import providerReducer from "./provider.reducer";
import characteristics from "./characteristic.reducer";
import projects from "./project.reducer";

const rootReducer = combineReducers({
  methodChunks,
  providerReducer,
  characteristics,
  projects
});

export default rootReducer;
