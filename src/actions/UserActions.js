import axios from 'axios';
import GlobalVars from '../GlobalVars';
import {
  USER_LOGIN_SUCCESS,
  USER_SET_FIELD,
  USER_LOGOUT,
  USER_FETCH,
  USER_LOGIN
} from './types';

export const userFetch = (token) => {
  const url = GlobalVars.api_url + '/user/details/';
  return (dispatch) => {
    dispatch({ type: USER_FETCH_START, payload: true });
    const access_token = 'Token ' + token;
    axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: access_token
      }
    }).then(response => {
      dispatch({ type: USER_FETCH, payload: response.data });
    }).catch(error => {
      console.log(error);
      dispatch({ type: USER_FETCH, payload: null });
    });
  };
};

export const setUserField = ({ prop, value }) => {
  return {
    type: USER_SET_FIELD,
    payload: { prop, value }
  };
};
