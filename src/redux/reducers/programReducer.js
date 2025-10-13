import {
  CREATE_PROGRAM_SUCCESS,
  CREATE_PROGRAM_FAIL,
  UPDATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_FAIL,
  DELETE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_FAIL,
  GET_ALL_PROGRAMS_SUCCESS,
  GET_ALL_PROGRAMS_FAIL,
  GET_PROGRAM_BY_ID_SUCCESS,
  GET_PROGRAM_BY_ID_FAIL,
} from "../actions/programActions";

const initialState = {
  programs: [],
  program: null,
  error: null,
};

const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROGRAM_SUCCESS:
      return {
        programs: [...state.programs, action.payload],
        error: null,
      };
    case CREATE_PROGRAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_PROGRAM_SUCCESS:
      return {
        programs: state.programs.map((program) =>
          program._id === action.payload._id ? action.payload : program
        ),
        error: null,
      };
    case UPDATE_PROGRAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PROGRAM_SUCCESS:
      return {
        programs: state.programs.filter(
          (program) => program._id !== action.payload._id
        ),
        error: null,
      };
    case DELETE_PROGRAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_PROGRAMS_SUCCESS:
      return {
        programs: action.payload,
        error: null,
      };
    case GET_ALL_PROGRAMS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PROGRAM_BY_ID_SUCCESS:
      return {
        ...state,
        program: action.payload,
        error: null,
      };
    case GET_PROGRAM_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default programReducer;
