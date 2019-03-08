import React, { Component } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
//import BasicStyles from '../commonStyles/BasicStyles';
import GlobalVars from '../GlobalVars';
import SimpleModal from '../components/SimpleModal';
import { Input, ImageButton, Line, Spinner } from '../components/common';
import { setAuthToken } from '../GlobalMethods';
import { setUserField, userFetch, pickCity } from '../actions';
import registerForPushNotificationsAsync from '../functions/RegisterForPush';
import CityListItem from '../components/CityListItem';
import GlobalStyles from '../GlobalStyles';


class HomeScreen extends Component {

  state = {
    notification: {},
    loading_logout: false,
    modal_visible: false,
    cities: [],
    city_search: '',
    loading: false
  }

  componentDidMount() {
    this.getCities();
    this.props.userFetch(this.props.auth_token);
    console.log(this.props.user);
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
    this.props.pickCity(this.props.auth_token, item);
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
    if (!this.props.loading) {
      if (this.props.user && !this.props.user.city) {
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
                onSubmitEditing={this.getCities.bind(this)}
                returnKeyType='search'
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
    } else {
      return (
        <Spinner style={{ marginTop: 20 }} text='Register city...' />
      );
    }
  }

  renderBasicProfile() {
    if (this.props.user) {
      const { full_name, email } = this.props.user;
      return (
        <View style={styles.profileContainer}>
          <Image style={styles.imageStyle} resizeMode='contain' source={require('../../assets/images/swimmer.png')} />
          <View style={styles.textContainer}>
            <Text style={[styles.profileText, { fontSize: 22, fontWeight: '400' }]}>{full_name}</Text>
            <Text style={[styles.profileText, { fontSize: 18 }]}>Email: {email}</Text>
          </View>
        </View>
      );
    }
  }

  renderProfileDetails() {
    if (this.props.user && this.props.user.city) {
      return (
        <View style={styles.detailContainer}>
          <View style={styles.textDetailContainer}>
            <Image
              resizeMode='contain'
              style={styles.detailImage}
              source={require('../../assets/icons/swimming_pool.png')}
            />
            <View style={styles.onlyTextContainer}>
              <Text style={[styles.textDetail, { fontWeight: '600' }]}>Pool Size: </Text>
              <Text style={[styles.textDetail, { marginLeft: 2 }]}>{this.props.user.pool_size} cubic metres</Text>
            </View>
          </View>
          <View style={styles.textDetailContainer}>
            <Image
              resizeMode='contain'
              style={styles.detailImage}
              source={require('../../assets/icons/worldwide.png')}
            />
            <View style={styles.onlyTextContainer}>
              <Text style={[styles.textDetail, { fontWeight: '600' }]}>City: </Text>
              <Text style={[styles.textDetail, { marginLeft: 2 }]}>{this.props.user.city}</Text>
            </View>
          </View>
          <View style={styles.textDetailContainer}>
            <Image
              resizeMode='contain'
              style={styles.detailImage}
              source={require('../../assets/icons/device.png')}
            />
            <View style={styles.onlyTextContainer}>
              <Text style={[styles.textDetail, { fontWeight: '600' }]}>Device ID: </Text>
              <Text style={[styles.textDetail, { marginLeft: 2 }]}>{this.props.user.device}</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  /*

  <PrimaryButton style={styles.buttonStyle} onPress={() => this.setState({ modal_visible: true })}>
    Logout
  </PrimaryButton>
  */

  renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <ImageButton
          image={require('../../assets/icons/logout.png')}
          style={{ flex: 1, marginLeft: 6, height: 40, width: 90 }}
          onPress={() => this.setState({ modal_visible: true })}
          >
          Logout
        </ImageButton>
        <ImageButton
          image={require('../../assets/icons/edit.png')}
          style={{ flex: 1, marginLeft: 6, height: 40, width: 90 }}
          onPress={() => console.log('test')}
          >
          Edit
        </ImageButton>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', width: '100%' }}>
        {this.renderBasicProfile()}
        <Line />
        <KeyboardAwareScrollView style={{ backgroundColor: 'white', width: '100%' }}>
          <View style={styles.container}>
            {this.renderProfileDetails()}
            {this.renderCities()}
            {this.renderButtons()}
            <SimpleModal
                visible={this.state.modal_visible}
                onClose={() => this.setState({ modal_visible: false })}
                onComplete={this.logout.bind(this)}
                title='Sure you wanna logout?'
                buttonTitle='Logout'
              />
          </View>
        </KeyboardAwareScrollView>
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
    //fontWeight: '600',
    color: GlobalStyles.grayColor,
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
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    padding: 10,
    paddingTop: 20,
    paddingLeft: 20,
    width: '100%'
  },
  imageStyle: {
    width: 100,
    flex: 1
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    height: 80,
    flex: 3
  },
  profileText: {
    fontFamily: GlobalStyles.fontFamily,
    //fontWeight: '600',
    color: GlobalStyles.grayColor,
    marginTop: 5
  },
  detailContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  textDetailContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 15
  },
  onlyTextContainer: {
    flexDirection: 'row',
    flex: 5
  },
  textDetail: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 16,
    color: GlobalStyles.grayColor,
    alignSelf: 'center',
    marginLeft: 10
  },
  detailImage: {
    height: 40,
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginTop: 20
  }
};

const mapStateToProps = (state) => {
  const { auth_token, user, loading } = state.user;
  return { auth_token, user, loading };
};

export default connect(mapStateToProps, { setUserField, userFetch, pickCity })(HomeScreen);
