import {
  ADD_PROVIDER,
  READ_PROVIDER,
  FETCH_PROVIDER_BEGIN,
  FETCH_PROVIDER_FAILURE,
  FETCH_PROVIDER_SUCCESS
} from "../actions";

const initialState = {
  providers: []
};

const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROVIDER:
      return {
        ...state,
        providers: [...state.providers, action.payload.provider]
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
      return {
        ...state,
        loading: false,
        providers: action.payload.providers
      };
    case FETCH_PROVIDER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        providers: []
      };
    default:
      return state;
  }
};

export default providerReducer;
