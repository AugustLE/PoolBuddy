import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BasicStyles from '../commonStyles/BasicStyles'

class PoolScreen extends Component {
  static navigationOptions = {
    title: 'Pool',
  };

  render() {
    return (
      <View style={BasicStyles.container}>
        <Text style={styles.textStyle}>
          Pool Screen
        </Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    color: 'gray'
  }
};

export default PoolScreen;
