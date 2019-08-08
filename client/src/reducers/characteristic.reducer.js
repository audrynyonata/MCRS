import {
  ADD_CHARACTERISTIC,
  READ_CHARACTERISTIC,
  FETCH_CHARACTERISTIC_BEGIN,
  FETCH_CHARACTERISTIC_FAILURE,
  FETCH_CHARACTERISTIC_SUCCESS
} from "../actions";

const initialState = {
  all: []
};

const characteristics = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERISTIC:
      let entry = {};
      let item = action.payload.characteristic;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
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
      let entries = {};
      let ids = [];
      action.payload.characteristics.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_CHARACTERISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default characteristics;
