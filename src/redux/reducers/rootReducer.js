import { combineReducers } from "@reduxjs/toolkit";
import workoutReducer from "./workoutReducer";
import programReducer from "./programReducer";
import reviewReducer from "./reviewReducer";
import contactUsReducer from "./contactReducers";


const rootReducer = combineReducers({
  workoutReducer: workoutReducer,
  programReducer: programReducer,
  reviewReducer: reviewReducer,
  contactUsReducer: contactUsReducer,
});

export default rootReducer