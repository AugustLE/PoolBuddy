import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const SecondaryButton = (props) => {
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
    color: GlobalStyles.themeColor,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: GlobalStyles.fontFamily

  },

  buttonStyle: {
    //alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 2,
  }
};

export { SecondaryButton };
