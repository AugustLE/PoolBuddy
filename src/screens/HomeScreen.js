import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import BasicStyles from '../commonStyles/BasicStyles';
import GlobalVars from '../GlobalVars';
import SimpleModal from '../components/SimpleModal';
import { PrimaryButton, Input, ImageButton } from '../components/common';
import { setAuthToken } from '../GlobalMethods';
import { setUserField } from '../actions';
import registerForPushNotificationsAsync from '../functions/RegisterForPush';
import CityListItem from '../components/CityListItem';
import GlobalStyles from '../GlobalStyles';


class HomeScreen extends Component {

  state = {
    notification: {},
    loading_logout: false,
    modal_visible: false,
    cities: [],
    city_search: ''
  }

  componentDidMount() {
    this.getCities();
    registerForPushNotificationsAsync(this.props.auth_token);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  componentWillUnmount() {
    this.setState({ loading_logout: false, modal_visible: false });
  }

  logout() {
    const url = GlobalVars.api_url + '/user/logout/';
    const access_token = 'Token ' + this.props.auth_token;
    axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: access_token
      },
    }).then(() => {
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

  getCities() {
    const url = GlobalVars.api_url + '/client/getcities/';
    const access_token = 'Token ' + this.props.auth_token;
    axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: access_token
      },
      params: {
        city_search: this.state.city_search
      }
    }).then((response) => {
      this.setState({ cities: response.data });
    }).catch(() => {
      console.log('ERROR');
    });
  }

  onListItemPress(item) {
    console.log(item);
  }

  /*
  <CityListItem
    key={item.pk}
    onPress={this.onListItemPress.bind(this, item)}
    item={item}
    style={{ height: 40 }}
  />*/
  renderItem(item) {
    return (
      <CityListItem
        key={item.pk}
        onPress={this.onListItemPress.bind(this, item)}
        item={item}
        style={{ width: '100%' }}
      />
    );
  }

  renderCities() {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={styles.textStyle}>
          Choose area of residence
        </Text>
        <View style={styles.searchContainer}>
          <Input
            placeholder={'Area...'}
            onChangeText={(text) => this.setState({ city_search: text })}
            value={this.state.city_search}
            style={{ flex: 4, height: 45, marginTop: 0, backgroundColor: 'white' }}
          />
          <ImageButton
            image={require('../../assets/icons/search.png')}
            style={{ flex: 1, marginLeft: 6, height: 50 }}
            onPress={this.getCities.bind(this)}
            >
            Search
          </ImageButton>
        </View>
        <FlatList
          data={this.state.cities}
          style={{ width: '100%' }}
          renderItem={object => this.renderItem(object.item)}
          keyExtractor={object => object.pk.toString()}
          navigation={this.props.navigation}
          contentContainerStyle={styles.listContentStyle}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCities()}
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
  container: {
    flex: 1,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
    fontFamily: GlobalStyles.fontFamily
  },
  buttonStyle: {
    width: '90%',
    marginTop: 20
  },
  listContentStyle: {
    paddingBottom: 15,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20
  }
};

const mapStateToProps = (state) => {
  const { auth_token } = state.user;
  return { auth_token };
};

export default connect(mapStateToProps, { setUserField })(HomeScreen);
