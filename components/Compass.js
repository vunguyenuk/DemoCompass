import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';

export default class Compass extends Component {
  constructor() {
    super();
    this.state = {
      rot: 0,
    };
  }

  componentDidMount() {
    const degree_update_rate = 1; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, degree => {
      // console.log('You are facing', degree);
      this.setState({ rot: degree });
    });
  }

  componentWillUnmount() {
    RNSimpleCompass.stop();
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.rot + '°'}</Text>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../assets/compass.png')}
            style={{
              width: deviceWidth - 10,
              height: deviceHeight / 2 - 10,
              left: deviceWidth / 2 - (deviceWidth - 10) / 2,
              top: deviceHeight / 2 - (deviceHeight / 2 - 10) / 2,
              transform: [{ rotate: `${-this.state.rot}deg` }]
            }}
          />
        </View>
        <View style={styles.arrowContainer}>
          <Image
            resizeMode="contain"
            source={require('../assets/arrow.png')}
            style={styles.arrow}
          />
        </View>
      </View>
    );
  }
}

// Device dimensions so we can properly center the images set to 'position: absolute'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#263544',
    fontSize: 80,
    transform: [
      { translateY: -(deviceHeight / 2 - (deviceHeight / 2 - 10) / 2) - 50 }
    ]
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject
  },
  arrowContainer: {
    ...StyleSheet.absoluteFillObject
  },
  arrow: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    left: deviceWidth / 2 - deviceWidth / 7 / 2,
    top: deviceHeight / 2 - deviceWidth / 7 / 2,
    opacity: 0.9
  }
});
