import {
  USER_LOGIN_SUCCESS,
  USER_SET_FIELD,
  USER_LOGOUT,
  USER_LOGIN,
  USER_FETCH,
  PICK_CITY
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  loading: false,
  auth_token: null,
  loading_logout: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case USER_SET_FIELD:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_FETCH:
      return { ...state, user: action.payload };
    case USER_LOGIN:
      return { ...state, auth_token: action.payload };
    case PICK_CITY:
      return { ...state, user: action.payload, loading: false };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
