import React from 'react';
import { TextInput, View } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const Input = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        style={[styles.inputStyle, props.inputStyle]}
        onChangeText={props.onChangeText}
        value={props.value}
        autoCorrect={false}
        placeholder={props.placeholder}
        multiline={props.multiline}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
      />
    </View>
  );
};

const styles = {

  inputStyle: {
    color: '#000',
    //paddingRight: 5,
    paddingLeft: 15,
    fontSize: 20,
    lineHeight: 23,
    flex: 1,
    fontFamily: GlobalStyles.fontFamily,
    //flex: 2
  },
  containerStyle: {

    //height: 40,
    padding: 10,
    marginTop: 8,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f7f5f5',
    //backgroundColor: 'white',
    width: '90%',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
    //alignItems: 'center',

  }
};

export { Input };
