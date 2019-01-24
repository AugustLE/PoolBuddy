import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BasicStyles from '../commonStyles/BasicStyles';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {

    return(
      <View style={BasicStyles.container}>
        <Text style={styles.textStyle}>
          Settings
        </Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    color: '#70e5ff'
  }
}

export default SettingsScreen;
