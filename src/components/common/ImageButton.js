import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

class ImageButton extends Component {
  renderText() {
    if (this.props.children) {
      return (
        <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.children}</Text>
      );
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.containerStyle}>
        <View style={[styles.container, this.props.style]}>
          <View styles={styles.imageContainer}>
            <Image resizeMode='contain' source={this.props.image} style={[styles.imageStyle, this.props.imageStyle]} />
          </View>
          {this.renderText()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 2,
    backgroundColor: 'white',

  },
  imageContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  imageStyle: {
    width: 20,
    height: 20
  },
  textStyle: {
    fontFamily: GlobalStyles.fontFamily,
    fontSize: 16,
    paddingLeft: 5
  }
};

export { ImageButton };
