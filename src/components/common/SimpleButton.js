import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const SimpleButton = (props) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
      <Text style={[textStyle, props.textStyle]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {

  textStyle: {
    alignSelf: 'center',
    color: '#16C8FB',
    fontSize: 18,
    fontWeight: '200',
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: GlobalStyles.fontFamily

  },

  buttonStyle: {
    //alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,

  }
};

export { SimpleButton };
