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



export default class Taxable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    let model = {

      _keys: [],

      _listeners: [],

      addKey(key) {
        alert("addkey")
        this._keys.push(key);
        this._notify();
      },

      delKey() {
        this._keys.pop();
        this._notify();
      },

      clearAll() {
        this._keys = [];
        this._notify();
      },

      getKeys() {
        return this._keys;
      },

      onChange(listener) {
        if (typeof listener === 'function') {
          this._listeners.push(listener);
        }
      },

      _notify() {
        this._listeners.forEach((listner) => {
          listner(this);
        });
      }
    };

    model.onChange((model) => {
      this.setState({ text: model.getKeys().join('') });
    });
  }
  _handleClear() {
    model.clearAll();
  }


  _handleDelete() {
    model.delKey();
  }

  _handleKeyPress(key) {
    model.addKey(key);
  }
  // render() {
  //     return (
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //         <Text>Home Screen</Text>
  //         <Button
  //           title="Go to Details"
  //           onPress={() => this.props.navigation.navigate('Login')}
  //         />
  //       </View>
  //     );
  //   }
  // }
  render() {
    return (
      <View style={{ flex: 1, marginBottom: 100 }}>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.text}>{this.state.text}</Text> */}
          <Button
            title="Show Dialog"
            onPress={() => {
              this.setState({ visible: true });
            }}
          />
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
          ></Dialog>
          <DialogContent>
            <Keyboard style={{ marginBottom: 100 }}
              keyboardType="number-pad"
              onClear={this._handleClear.bind(this)}
              onDelete={this._handleDelete.bind(this)}
              onKeyPress={this._handleKeyPress.bind(this)}
            />
          </DialogContent>
        </View>

      </View>
    );
  }
}
