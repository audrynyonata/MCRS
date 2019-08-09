import {
  ADD_PROVIDER,
  READ_PROVIDER,
  FETCH_PROVIDER_BEGIN,
  FETCH_PROVIDER_FAILURE,
  FETCH_PROVIDER_SUCCESS
} from "../actions";

const initialState = {
  all: []
};

const providers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROVIDER:
      let entry = {};
      let item = action.payload.provider;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case READ_PROVIDER:
      return state;
    case FETCH_PROVIDER_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_PROVIDER_SUCCESS:
      let entries = {};
      let ids = [];
      action.payload.providers.forEach(p => {
        entries[p.id] = p;
        ids[ids.length] = p.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_PROVIDER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default providers;
