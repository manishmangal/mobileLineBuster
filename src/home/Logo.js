import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../Images/poslogo.jpg')}
        resizeMode = 'contain'
          style={{
            width: 100,
            height: 40,
            // marginLeft: 60,
            // backgroundColor:"#fff"
          }}
        />
      </View>
    );
  }
}