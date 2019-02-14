import React, { Component } from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserField } from '../actions';
import { PrimaryButton, Input, SimpleButton, Spinner, Line } from '../components/common';
import { getAuthToken, setAuthToken } from '../GlobalMethods';
import GlobalStyles from '../GlobalStyles';
import GlobalVars from '../GlobalVars';
//import ResetPassModal from './ResetPassModal';

class Login extends Component {

  state = {
    username: '',
    password: '',
    loading: false,
    errors: false,
    error_text: '',
  }


  loginUser() {
    const url = GlobalVars.api_url + '/user/login/'; //'user/login/';
    const { username, password } = this.state;
    this.setState({ loading: true });
    axios({
      method: 'post',
      url: url,
      data: {
        username: username,
        password: password,
      }
    }).then((response) => {
      if (response.data.error === null) {
        this.setState({ loading: false, errors: false, password: '' });
        setAuthToken(response.data.token);
        this.props.setUserField({ prop: 'auth_token', value: response.data.token });
        this.props.navigation.navigate('App');
      } else {
        this.setState({ loading: false, errors: true, error_text: response.data.error });
      }
    }).catch(() => {
      this.setState({ loading: false, errors: true, error_text: 'Something went wrong, check your connection' });
    });
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  componentDidMount() {
    getAuthToken().then((token) => {
      if (token) {
        this.props.setUserField({ prop: 'auth_token', value: token });
        this.props.navigation.navigate('App');
      }
    });
    /*getItem('user_email').then(email => {
      if (email) {
        this.setState({ username: email });
      }
    });*/
  }

  renderError() {
    if (this.state.errors) {
      return (
        <Text style={{ color: 'red', fontFamily: GlobalStyles.fontFamily, marginTop: 5 }}>
          {this.state.error_text}
        </Text>
      );
    }
  }

  renderLoginButton() {
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center', flex: 1, marginTop: 20 }}>
          <Text style={{ color: 'gray', fontFamily: GlobalStyles.fontFamily }}>Logger inn...</Text>
          <Spinner style={{ marginTop: 10 }} />
        </View>
      );
    }
    return (
      <PrimaryButton
        style={{ width: '90%', marginTop: 15, borderRadius: 2 }}
        onPress={this.loginUser.bind(this)}>
        Logg inn
      </PrimaryButton>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.topNav}>
          <Image style={styles.logoStyle} source={require('../../assets/icons/logo.png')} />
        </View>

        <View style={styles.midContainer}>
          <View style={styles.input}>
            <Input
              placeholder={'Email'}
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username.toLowerCase()}
              autoCapitalize={false}
            />
            <Input
              placeholder={'Password'}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
          {this.renderError()}
          {this.renderLoginButton()}
          <Line />
        </View>
        <Line />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTextStyle}>
            Don´t have an account?
          </Text>
          <SimpleButton
            onPress={this.register.bind(this)}>
            Register now
          </SimpleButton>


        </View>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
      </View>
    );
  }
}

const styles = {

  topNav: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f7f5f5'

  },
  logoStyle: {
    width: 100,
    height: 100
  },

  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  input: {
    //flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },

  midContainer: {
    width: '100%',
    marginTop: 25,
    alignItems: 'center',
    flex: 3
  },
  bottomContainer: {
    width: '100%',
    marginTop: 25,
    //alignItems: 'center',
    flex: 1
  },
  bottomTextStyle: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { auth_token } = state.user;
  return { auth_token };
};

export default connect(mapStateToProps, { setUserField })(Login);
