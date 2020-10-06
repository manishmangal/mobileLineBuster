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
import { NavigationEvents } from 'react-navigation';



export default class Hold extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      test:""
    };
  }

  componentDidMount() {


    Alert.alert("Manish")

    AsyncStorage.getItem("test").then(test => {
      if (test) {
        //alert(datastore)
        this.setState({ test: test });
      }
    });
    
  }


 
 


  


  render() {
      return (
        <View style={{ flex: 1,backgroundColor:'gray' ,   justifyContent: 'center',
        alignItems: 'center' }}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />

       <View style = {styles.holdView}> 
       
          <Text style = {styles.holdTextInput}>Hold Screen</Text>
          <TextInput style = {styles.holdInput} placeholder= "Enter Name"></TextInput>
         
        </View>
        </View>
      )
      
    };

}
   const styles = StyleSheet.create({

    holdTextInput:{
      fontSize:18,
      color:'red',
      marginLeft:20,
      width:"30%",
      // marginTop:100
    },
    holdView:{
    //  marginTop: "40%",
     alignContent:'center',
     flexDirection:'row',
    //  alignSelf:'flex-start',
     backgroundColor:'white',
     width:"100%",

    },
    holdInput:{
    //  flex:1,
   
     height:40,
     width:"60%",
     borderWidth:1,
    
    },

  }) 
  

