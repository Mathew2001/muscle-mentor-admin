
import programServices from "../services/programsServices";

export const CREATE_PROGRAM_SUCCESS = "CREATE_PROGRAM_SUCCESS";
export const CREATE_PROGRAM_FAIL = "CREATE_PROGRAM_FAIL";
export const UPDATE_PROGRAM_SUCCESS = "UPDATE_PROGRAM_SUCCESS";
export const UPDATE_PROGRAM_FAIL = "UPDATE_PROGRAM_FAIL";
export const DELETE_PROGRAM_SUCCESS = "DELETE_PROGRAM_SUCCESS";
export const DELETE_PROGRAM_FAIL = "DELETE_PROGRAM_FAIL";
export const GET_ALL_PROGRAMS_SUCCESS = "GET_ALL_PROGRAMS_SUCCESS";
export const GET_ALL_PROGRAMS_FAIL = "GET_ALL_PROGRAMS_FAIL";
export const GET_PROGRAM_BY_ID_SUCCESS = "GET_PROGRAM_BY_ID_SUCCESS";
export const GET_PROGRAM_BY_ID_FAIL = "GET_PROGRAM_BY_ID_FAIL";

export const createProgram =
  ({name, durationWeeks, description, images}) => async (dispatch) => {
    try {
      const program = await programServices.createProgram({
        name,
        durationWeeks,
        description,  
        images,
      });
      dispatch({ type: CREATE_PROGRAM_SUCCESS, payload: program });
    } catch (error) {
      dispatch({
        type: CREATE_PROGRAM_FAIL,
        payload: error?.response?.data?.message || "create program failed",
      });
    }
  };

export const updateProgram =
  (id, { name, durationWeeks, description, images }) =>
  async (dispatch) => {
    try {
      const programs = await programServices.updateProgram(id, {
        name,
        durationWeeks,
        description,
        images,
      });
      dispatch({ type: UPDATE_PROGRAM_SUCCESS, payload: programs });
    } catch (error) {
      dispatch({
        type: error?.response?.data?.message || "update program failed",
      });
    }
  };

export const deleteProgram = (id) => async (dispatch) => {
  try {
    const programs = await programServices.deleteProgram(id);
    dispatch({ type: DELETE_PROGRAM_SUCCESS, payload: programs });
  } catch (error) {
    dispatch({
      type: error?.response?.data?.message || "delete program failed",
    });
  }
};

export const getAllPrograms = () => async (dispatch) => {
  try {
    const programs = await programServices.getAllPrograms();
    dispatch({ type: GET_ALL_PROGRAMS_SUCCESS, payload: programs });
  } catch (error) {
    dispatch({
      type: error?.response?.data?.message || "get all progarms failed",
    });
  }
};

export const getProgramById = (id) => async (dispatch) => {
  try {
    const program = await programServices.getProgramById(id)
    if(program)
    {
      dispatch({
        type: GET_PROGRAM_BY_ID_SUCCESS,payload:program
      });
    }
  } catch (error) {
    dispatch({
      type:GET_PROGRAM_BY_ID_FAIL,payload:null
    })
  }
}  