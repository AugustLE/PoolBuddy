import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const Spinner = (props) => {
  return (
    <View style={[styles.spinnerStyle, props.style]}>
      <ActivityIndicator size={props.size || 'large'} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = {

  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  text: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 16,
    color: '#a4a4a4',
    textAlign: 'center',
    marginTop: 15
  }
};

export { Spinner };
