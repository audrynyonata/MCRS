import {
  ADD_CHARACTERISTIC,
  READ_CHARACTERISTIC,
  FETCH_CHARACTERISTIC_BEGIN,
  FETCH_CHARACTERISTIC_FAILURE,
  FETCH_CHARACTERISTIC_SUCCESS
} from "../actions";

const initialState = {
  characteristics: []
};

const characteristicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERISTIC:
      return {
        ...state,
        characteristics: [
          ...state.characteristics,
          action.payload.characteristic
        ]
      };
    case READ_CHARACTERISTIC:
      return state;
    case FETCH_CHARACTERISTIC_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_CHARACTERISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        characteristics: action.payload.characteristics
      };
    case FETCH_CHARACTERISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        characteristics: []
      };
    default:
      return state;
  }
};

export default characteristicReducer;
