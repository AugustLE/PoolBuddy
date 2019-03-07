import {
  CLIENT_SET_FIELD
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_SET_FIELD:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
