import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import GlobalStyles from '../GlobalStyles';
import { PrimaryButton, SecondaryButton } from '../components/common';

class SimpleModal extends Component {

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.visible}
          transparent
          animationIn="slideInUp"
          animationOut="slideOutLeft"
          onRequestClose={() => {}}
          onComplete={this.props.onComplete}>

          <View style={styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <View style={styles.buttonContainer}>
              <PrimaryButton style={[styles.buttonExtra, this.props.buttonStyle]} onPress={this.props.onComplete}>{this.props.buttonTitle}</PrimaryButton>
              <SecondaryButton
                style={styles.buttonExtra}
                onPress={this.props.onClose}
                textStyle={this.props.secButtonTextStyle}>
                Cancel
              </SecondaryButton>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '200'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  buttonExtra: {
    marginLeft: 5,
    marginRight: 5
  }
};

export default SimpleModal;
