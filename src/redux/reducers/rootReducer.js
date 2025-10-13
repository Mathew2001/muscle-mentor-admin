import { combineReducers } from "@reduxjs/toolkit";
import workoutReducer from "./workoutReducer";
import programReducer from "./programReducer";

const rootReducer = combineReducers({
  workoutReducer: workoutReducer,
  programReducer: programReducer,
});

export default rootReducer