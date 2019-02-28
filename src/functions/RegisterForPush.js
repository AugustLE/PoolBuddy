import React from 'react';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import GlobalVars from '../GlobalVars';


export default async function registerForPushNotificationsAsync(user_token) {
  
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }


  // Get the token that uniquely identifies this device
  let push_token = await Notifications.getExpoPushTokenAsync();

  const url = GlobalVars.api_url + '/user/registerpush/';
  const access_token = 'Token ' + user_token;

  axios({
    method: 'post',
    url: url,
    headers: {
      Authorization: access_token
    },
    data: {
      push_token: push_token
    }
  }).then(response => {

  }).catch(error => {
    console.log(error);
  });
  // POST the token to your backend server from where you can retrieve it to send push notifications.
}
