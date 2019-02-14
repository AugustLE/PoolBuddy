import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import BasicStyles from '../commonStyles/BasicStyles';
import GlobalVars from '../GlobalVars';
import SimpleModal from '../components/SimpleModal';
import { PrimaryButton } from '../components/common';
import { setAuthToken } from '../GlobalMethods';
import { setUserField } from '../actions';
import registerForPushNotificationsAsync from '../functions/RegisterForPush';


class HomeScreen extends Component {

  state = {
    notification: {},
    loading_logout: false,
    modal_visible: false
  }

  componentDidMount() {
    console.log(this.props.auth_token);
    registerForPushNotificationsAsync(this.props.auth_token);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  logout() {
    const url = GlobalVars.api_url + '/user/logout/';
    const access_token = 'Token ' + this.props.auth_token;
    console.log(this.props.auth_token);
    this.setState({ loading_logout: true, modal_visible: false });
    axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: access_token
      },
    }).then(() => {
      this.setState({ loading_logout: false });
      this.props.setUserField({ prop: 'auth_token', value: null });
      setAuthToken('');
      this.props.navigation.navigate('Main');
    }).catch(() => {
      this.setState({ loading_logout: false });
      this.props.setUserField({ prop: 'auth_token', value: null });
      setAuthToken('');
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <View style={BasicStyles.container}>
        <Text style={styles.textStyle}>
          Home Screen
        </Text>
        <PrimaryButton style={styles.buttonStyle} onPress={() => this.setState({ modal_visible: true })}>
          Logout
        </PrimaryButton>
        <SimpleModal
            visible={this.state.modal_visible}
            onClose={() => this.setState({ modal_visible: false })}
            onComplete={this.logout.bind(this)}
            title='Sure you wanna logout?'
            buttonTitle='Logout'
          />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    color: 'black'
  },
  buttonStyle: {
    width: '90%',
    marginTop: 20
  }
};

const mapStateToProps = (state) => {
  const { auth_token } = state.user;
  return { auth_token };
};

export default connect(mapStateToProps, { setUserField })(HomeScreen);
