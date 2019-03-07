import axios from 'axios';
import GlobalVars from '../GlobalVars';
import {
  USER_SET_FIELD,
  USER_FETCH,
  PICK_CITY,
  USER_FETCH_START
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

export const pickCity = (token, city) => {
  const url = GlobalVars.api_url + '/client/registercity/';
  return (dispatch) => {
    dispatch({ type: USER_SET_FIELD, payload: { prop: 'loading', value: true } });
    const access_token = 'Token ' + token;
    axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: access_token
      },
      data: {
        city_pk: city.pk
      }
    }).then(response => {
      dispatch({ type: PICK_CITY, payload: response.data });
    }).catch(error => {
      console.log(error);
      dispatch({ type: USER_SET_FIELD, payload: { prop: 'loading', value: false } });
    });
  };
};


export const setUserField = ({ prop, value }) => {
  return {
    type: USER_SET_FIELD,
    payload: { prop, value }
  };
};
