import React from 'react';
import { Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const ErrorText = (props) => {
  return (
    <Text style={[{ color: 'red', fontFamily: GlobalStyles.fontFamily, marginTop: 5 }, props.style]}>
      {props.children}
    </Text>
  );
};

export { ErrorText };
