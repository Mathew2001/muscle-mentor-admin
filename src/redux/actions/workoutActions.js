import { type } from "@testing-library/user-event/dist/type";
import workoutServices from "../services/workoutServices";

export const CREATE_WORKOUT_SUCCESS = "CREATE_WORKOUT_SUCCESS";
export const CREATE_WORKOUT_FAIL = "CREATE_WORKOUT_FAIL";
export const UPDATE_WORKOUT_SUCCESS = "UPDATE_WORKOUT_SUCCESS";
export const UPDATE_WORKOUT_FAIL = "UPDATE_WORKOUT_FAIL";
export const DELETE_WORKOUT_SUCCESS = "DELETE_WORKOUT_SUCCESS";
export const DELETE_WORKOUT_FAIL = "DELETE_WORKOUT_FAIL";
export const GET_ALL_WORKOUTS_SUCCESS = "GET_ALL_WORKOUTS_SUCCESS";
export const GET_ALL_WORKOUTS_FAIL = "GET_ALL_WORKOUTS_FAIL";
export const GET_WORKOUT_BY_ID_SUCCESS = "GET_WORKOUT_BY_ID_SUCCESS";
export const GET_WORKOUT_BY_ID_FAIL = "GET_WORKOUT_BY_ID_FAIL";

export const createWorkout =
  (title, duration, description, level, muscleGroup, programId) => async (dispatch) => {
    try {
      const res = await workoutServices.createWorkout({
        programId,
        title,
        duration,
        description,
        level,
        muscleGroup,
      });
      if (res) dispatch({ type: CREATE_WORKOUT_SUCCESS, payload: res });
    } catch (error) {
      dispatch({
        type: CREATE_WORKOUT_FAIL,
        payload: error?.response?.data?.message || "Error creating workout",
      });
    }
  };

export const updateWorkout =
  (id, { title, duration, description, level, muscleGroup, programId }) =>
  async (dispatch) => {
    try {
      const res = await workoutServices.updateWorkout(id, {
        programId,
        title,
        duration,
        description,
        level,
        muscleGroup,
      });
      if (res) dispatch({ type: UPDATE_WORKOUT_SUCCESS, payload: res });
    } catch (error) {
      dispatch({
        type: UPDATE_WORKOUT_FAIL,
        payload: error?.response?.data?.message || "Error update workout",
      });
    }
  };
export const deleteWorkout = (id) => async (dispatch) => {
  try {
    const res = await workoutServices.deleteWorkout(id);
    if (res) dispatch({ type: DELETE_WORKOUT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({
      type: DELETE_WORKOUT_FAIL,
      payload: error?.response?.data?.message || "Error delete workout",
    });
  }
};

export const getAllWorkouts = () => async (dispatch) => {
  try {
    const workouts = await workoutServices.getAllWorkouts();
    if (workouts)
      dispatch({ type: GET_ALL_WORKOUTS_SUCCESS, payload: workouts });
  } catch (error) {
    dispatch({
      type: GET_ALL_WORKOUTS_FAIL,
      payload: error?.response?.data?.message || "Error get all workouts",
    });
  }
};

export const getWorkoutById = (id) => async (dispatch) => {
  try {
    const workout = await workoutServices.getWorkoutById(id);
    if (workout) {
      dispatch({
        type: GET_WORKOUT_BY_ID_SUCCESS,
        payload: workout,
      });
    }
  } catch (error) {
    dispatch({ type: GET_WORKOUT_BY_ID_FAIL, payload: null });
  }
};
