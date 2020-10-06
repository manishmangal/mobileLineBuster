import React from 'react'
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  AsyncStorage,
  Alert,

} from 'react-native'
import Keyboard from 'react-native-keyboard';
import Dialog, { DialogContent } from 'react-native-popup-dialog';



export default class PriceCheck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    
  }
 


  


  render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>PriceCheck Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      );
    }
  }
  
