import {
  CREATE_WORKOUT_SUCCESS,
  CREATE_WORKOUT_FAIL,
  UPDATE_WORKOUT_SUCCESS,
  UPDATE_WORKOUT_FAIL,
  DELETE_WORKOUT_SUCCESS,
  DELETE_WORKOUT_FAIL,
  GET_ALL_WORKOUTS_SUCCESS,
  GET_ALL_WORKOUTS_FAIL,
  GET_WORKOUT_BY_ID_SUCCESS,
  GET_WORKOUT_BY_ID_FAIL,
  GET_WORKOUT_BY_PROGRAM_ID_SUCCESS,
  GET_WORKOUT_BY_PROGRAM_ID_FAIL,
} from "../actions/workoutActions";

const initialState = {
  workouts: [],
  workout: null,
  workoutsByProgramId: [],
  error: null,
};
const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WORKOUT_SUCCESS:
      return {
        workouts: [...state.workouts, action.payload],
        error: null,
      };
    case CREATE_WORKOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_WORKOUT_SUCCESS:
      return {
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id ? action.payload : workout
        ),
        error: null,
      };
    case UPDATE_WORKOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_WORKOUT_SUCCESS:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
        error: null,
      };
    case DELETE_WORKOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_WORKOUTS_SUCCESS:
      return {
        workouts: action.payload,
        error: null,
      };
    case GET_ALL_WORKOUTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_WORKOUT_BY_ID_SUCCESS:
      return {
        ...state,
        workout: action.payload,
        error: null,
      };
    case GET_WORKOUT_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_WORKOUT_BY_PROGRAM_ID_SUCCESS:
      return {
        ...state,
        workoutsByProgramId: action.payload,
        error: null,
      };
    case GET_WORKOUT_BY_PROGRAM_ID_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;
