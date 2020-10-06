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
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,ActivityIndicator

} from 'react-native'
import Loading from "react-native-whc-loading";
//import Keyboard from 'react-native-keyboard';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "react-native-axios"
import { SectionGrid } from 'react-native-super-grid';
import DeviceInfo from 'react-native-device-info';
import ReactLoading from 'react-loading';


export default class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      visible: false,
      unholdView: true,
      unholdListArray: "",
      isLoading: false,
    };
  }

  componentDidMount() {

    // alert(global.ApiBaseUrl)
    // const axios = require('axios').default;
    // const axios = require('axios');
    // AsyncStorage.clear()

    //  DeviceInfo.getMacAddress().then(mac => {
    //   Alert.alert(JSON.stringify(mac))
    // });







  }

  cancelBtnPress = () => {

    this.setState({
      unholdView: false
    })

  }
  homeScreen = () => {
    //this.refs.loading.show(false);

    this.props.navigation.navigate('Dashboard')


  }

  holdBtnTapped = () => {

    this.setState(
      {
          isLoading: true,
      },
    )

    
  }



  render() {

    if (this.state.isLoading) {
      return (
          <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <ActivityIndicator size={"large"} />
          </View>
      );
  }
   
  
    return (
      <View style={{ height: "100%", backgroundColor: "#fff" }}>
           <View style={[styles.container, styles.horizontal]}>
       
        {/* <Text onPress={() => { this.setState({ holdVisibleView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text> */}
        <View style={styles.holdcontainer}>
      
          <View>

       
          </View>
          
          <View style={{ width: '100%' }}>
          <Text style={{ color: '#3386D6', fontSize: 20, fontWeight: "bold" ,marginLeft:"38%" ,marginTop:10}}>Item Details</Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}> Item Name: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}> {"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Category: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Department: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Price: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Cost: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Quantity on Hand: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Warehouse Qty: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Profit Margin: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>        
          </View>

        </View>
        <View style={styles.holdbtncontainerr}>
          <TouchableOpacity style={styles.holdbtncontainer} onPress={this.holdBtnTapped}>
            <Text style={styles.btnText}>OK</Text>
          </TouchableOpacity>
      
        </View>



      </View>
        </View>


    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  holdbtncontainerr: {

    marginLeft: "30%",
    flexDirection: 'row',
    marginTop: 20,
    width:"60%"
  },
  holdbtncontainer: {
    flex: 1,
    backgroundColor: '#3386D6',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 0,
    marginRight: 90,
    width: "15%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    alignItems: 'center'
  },

  unholdView: {
    //  marginTop: "40%",
    alignContent: 'center',
    flexDirection: 'row',
    //  alignSelf:'flex-start',
    backgroundColor: 'white',
    width: "100%",

  },
  holdcontainer: {

    marginBottom: 3,
    marginLeft: 10,
    flexDirection: 'row',
    marginTop:10
  },
  holdlabel: {
    fontSize: 18,
    fontWeight: '500',
    color: "#3386D6",
    marginTop: 20,
    // padding:10,
    // marginLeft:"28%",
    alignItems: 'center'

  },
  holdlabel1: {
    fontSize: 18,
    fontWeight: '500',
    color: "#3386D6",
    marginTop: 20,
    padding: 10,
    // marginLeft:"28%",
    alignItems: 'center'

  },

  holdtextInput: {
    //  flex: 1,
    // marginTop:60,
    backgroundColor: "#fff",
    fontSize: 20,
    marginLeft: 60,
    height: 40,
    width: "90%",
    borderColor: "#3386D6",
    borderWidth: 1,
    marginBottom: 15,
    // borderRadius: 20,
    // shadowColor: "#fff",
    // padding: 10,

  },




});

