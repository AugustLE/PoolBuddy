import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import GlobalStyles from '../GlobalStyles';
import GlobalVars from '../GlobalVars';
import { Line, PrimaryButton, Spinner } from '../components/common';

class PoolScreen extends Component {

  state = {
    short_term: true,
    short_term_data: [],
    long_term_data: [],
    loading: false
  }

  componentDidMount() {
    this.fetchForecast(true);
  }

  fetchForecast(short_term) {
    let url = GlobalVars.api_url + '/client/getshortterm/';
    if (!short_term) {
      url = GlobalVars.api_url + '/client/getlongterm/';
    }
    this.setState({ loading: true });
    axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Token ' + this.props.auth_token
      }
    }).then((response) => {
      this.setState({ loading: false });
      console.log(response.data);
      if (short_term) {
        this.setState({ short_term_data: response.data });
      } else {
        this.setState({ long_term_data: response.data });
      }
    });
  }

  renderSegmentControl() {
    const { activeText, buttonActive, inactiveText, buttonInactive } = styles;
    let style_short = buttonActive;
    let short_text = activeText;
    let style_long = buttonInactive;
    let long_text = inactiveText;
    if (!this.state.short_term) {
      style_short = buttonInactive;
      short_text = inactiveText;
      style_long = buttonActive;
      long_text = activeText;
    }

    return (
      <View style={styles.segmentView}>
        <PrimaryButton onPress={() => { this.setState({ short_term: true }); this.fetchForecast(true); }} textStyle={short_text} style={style_short}>
          Short term
        </PrimaryButton>
        <PrimaryButton onPress={() => { this.setState({ short_term: false }); this.fetchForecast(false); }} textStyle={long_text} style={style_long}>
          Long term
        </PrimaryButton>

      </View>
    );
  }

  forecastText(time_title, time) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.forecastTextStyle, { fontWeight: '600' }]}>{time_title}: </Text>
        <Text style={styles.forecastTextStyle}>{time} °C</Text>
      </View>
    );
  }

  renderShortTermItem(item) {
    return (
      <View key={item.pk} style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>{item.date}</Text>
        <View style={styles.forecastSubContainer}>
          <View style={styles.forecastTextContainer}>
            {this.forecastText('00 - 02', item.temp_0_to_2)}
            {this.forecastText('02 - 04', item.temp_2_to_4)}
            {this.forecastText('04 - 06', item.temp_4_to_6)}
            {this.forecastText('06 - 08', item.temp_6_to_8)}
            {this.forecastText('08 - 10', item.temp_8_to_10)}
            {this.forecastText('10 - 12', item.temp_10_to_12)}
          </View>
          <View style={styles.forecastTextContainer}>
            {this.forecastText('12 - 14', item.temp_12_to_14)}
            {this.forecastText('14 - 16', item.temp_14_to_16)}
            {this.forecastText('16 - 18', item.temp_16_to_18)}
            {this.forecastText('18 - 20', item.temp_18_to_20)}
            {this.forecastText('20 - 22', item.temp_20_to_22)}
            {this.forecastText('22 - 24', item.temp_22_to_24)}
          </View>
        </View>
      </View>
    );
  }

  renderLongTermItem(item) {
    return (
      <View key={item.pk} style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>{item.date}</Text>
        <View style={styles.forecastSubContainer}>
          <View style={styles.forecastTextContainer}>
            {this.forecastText('00 - 06', item.temp_0_to_6)}
            {this.forecastText('06 - 12', item.temp_6_to_12)}
          </View>
          <View style={styles.forecastTextContainer}>
            {this.forecastText('12 - 18', item.temp_12_to_18)}
            {this.forecastText('18 - 24', item.temp_18_to_24)}
          </View>
        </View>
      </View>
    );
  }

  forecastList() {
    if (!this.state.short_term) {
      return (
        this.state.long_term_data.map(item => {
          return (
            this.renderLongTermItem(item)
          );
        })
      );
    }
    return (
      this.state.short_term_data.map(item => {
        return (
          this.renderShortTermItem(item)
        );
      })
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <Spinner text='Loading forecast data...' />
      );
    }
    return (
      <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
        {this.forecastList()}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topSection}>
          <Image resizeMode='contain' style={styles.imageStyle} source={require('../../assets/images/forecast.png')} />
          <Text style={styles.titleStyle}>Pool forecast</Text>
        </View>
        {this.renderSegmentControl()}
        <Line />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    color: 'gray'
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    height: 125,
    paddingLeft: 25,
    paddingTop: 25,
    paddingBottom: 20

  },
  bottomSection: {

  },
  imageStyle: {
    flex: 1,
    height: 100,
  },
  titleStyle: {
    flex: 2,
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: '600',
    marginLeft: 20,
    color: GlobalStyles.darkBlueColor
  },
  segmentView: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonActive: {
    backgroundColor: GlobalStyles.themeColor,
    height: 36,
    borderRadius: 0
  },
  buttonInactive: {
    backgroundColor: 'white',
    height: 36,
    borderRadius: 0
  },
  activeText: {
    fontSize: 16,
    color: 'white',
    paddingTop: 8
  },
  inactiveText: {
    fontSize: 16,
    color: GlobalStyles.themeColor,
    paddingTop: 8
  },
  forecastContainer: {
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginTop: 2
  },
  forecastSubContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  forecastTextContainer: {
    padding: 10
  },
  forecastTitle: {
    fontSize: 22,
    fontFamily: GlobalStyles.fontFamily,
    paddingLeft: 10,
    color: GlobalStyles.darkBlueColor
  },
  forecastTextStyle: {
    fontSize: 16,
    fontFamily: GlobalStyles.fontFamily,
    color: GlobalStyles.themeColor
  }
};

/*

const mapStateToProps = (state) => {
  const { auth_token, user, loading } = state.user;
  return { auth_token, user, loading };
};

export default connect(mapStateToProps, { setUserField, userFetch, pickCity })(HomeScreen);

*/

const mapStateToProps = (state) => {
  const { auth_token } = state.user;
  return { auth_token };
};

export default connect(mapStateToProps, {})(PoolScreen);
