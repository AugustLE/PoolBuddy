import React from 'react';
import { Image } from 'react-native';

const Line = (props) => {
  return (
    <Image
      style={[{ width: '90%', marginTop: 25 }, props.style]}
      source={require('../../../assets/icons/images/line.png')}
    />
  );
};

export { Line };
