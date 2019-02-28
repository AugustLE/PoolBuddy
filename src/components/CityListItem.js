import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../GlobalStyles';

const CityListItem = (props) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{props.item.city_name}</Text>
        <View style={styles.rightImageContainer}>
          <Image style={styles.rightImageStyle} source={require('../../assets/icons/arrow_right.png')} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {

  containerStyle: {
    width: '95%',
    borderRadius: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    margin: 2,

  },
  textStyle: {
    fontSize: 20,
    fontWeight: '200',
    paddingLeft: 15,
    fontFamily: GlobalStyles.fontFamily,
    flex: 10,
    color: '#555555'
  },
  rightImageStyle: {
    width: 18,
    height: 18,
  },
  rightImageContainer: {
    width: 18,
    height: 18,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
};

export default CityListItem;
