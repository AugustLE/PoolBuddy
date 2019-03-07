import axios from 'axios';
import GlobalVars from '../GlobalVars';
import {
  CLIENT_SET_FIELD
} from './types';


export const setClientField = ({ prop, value }) => {
  return {
    type: CLIENT_SET_FIELD,
    payload: { prop, value }
  };
};
