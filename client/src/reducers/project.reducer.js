import {
  ADD_PROJECT,
  READ_PROJECT,
  FIND,
  FIND_BEGIN,
  FIND_FAILURE,
  FIND_SUCCESS,
  FETCH_PROJECT_BEGIN,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_SUCCESS
} from "../actions";

const initialState = {
  all: []
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      let entry = {};
      let item = action.payload.project;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case READ_PROJECT:
      return state;
    case FIND:
      return state;
    case FIND_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FIND_SUCCESS:
      return {
        ...state,
        results: action.payload.results
      };
    case FIND_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    case FETCH_PROJECT_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_PROJECT_SUCCESS:
      let entries = {};
      let ids = [];
      action.payload.projects.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default projects;
