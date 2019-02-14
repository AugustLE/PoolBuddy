import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ImagePicker, Permissions } from 'expo';
import GlobalVars from './GlobalVars';
import GlobalStyles from './GlobalStyles';

export async function setAuthToken(token) {
  try {
    await AsyncStorage.setItem('AuthToken', token);
  } catch (error) {

  }
}

export async function getAuthToken() {
  try {
    const value = await AsyncStorage.getItem('AuthToken');
    if (value !== null) {
      return value;
    }
  } catch (error) {

  }
}

export function formatDateTime(dateTime) {
  if (!dateTime) {
    return '';
  }
  const parts = dateTime.split('T');
  const date_parts = parts[0].split('-');
  const date = date_parts[2] + '/' + date_parts[1] + ' - ' + date_parts[0];
  const time_parts = parts[1].split('.')[0].split(':');
  const time = time_parts[0] + ':' + time_parts[1];
  const date_time = date + ', ' + time;
  return date_time;
}

export function goBackDelay(props) {
  setTimeout(
    () => {
      props.navigation.goBack();
    }, 700);
}
