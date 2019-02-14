import React from 'react';
import { View, Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const TextCompleted = (props) => {
  return (
    <View style={[styles.container, props.style]}>

      <Text style={[styles.textStyle, props.textStyle]}>{props.children}</Text>
    </View>
  );
};
/*
<Image
  resizeMode='contain'
  source={require('../../../assets/Icons/Common/checked_green.png')}
  style={[styles.imageStyle, props.imageStyle]} />
*/

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20
  },
  textStyle: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 10,
    color: GlobalStyles.themeColor
  },
  imageStyle: {
    width: 20,
    height: 20
  }
};

export { TextCompleted };
