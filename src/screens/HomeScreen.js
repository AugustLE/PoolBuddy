import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import BasicStyles from '../commonStyles/BasicStyles'
import GlobalVars from '../GlobalVars';
import axios from 'axios';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pool-Buddy',
  };

  componentDidMount() {
    console.log('Hello');
  }

  render() {
    return (
      <View style={BasicStyles.container}>
        <Text style={styles.textStyle}>
          Home Screen
        </Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    color: 'black'
  },
}


export default HomeScreen;
