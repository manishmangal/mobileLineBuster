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
  ActivityIndicator

} from 'react-native'
import moment from 'moment-timezone'
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationEvents } from 'react-navigation'

export default class Login extends React.Component {


  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      storeID: "",
      password: "",
      isLoading: false,
     
    }
  }

  // componentWillUnmount(){
  //   this.setState({
  //     name:"",
  //     email:"",
  //     storeID:"",
  //     password:""
  //   })

  // }

  
//   const Example = ({ type, color }) => (
//     <ReactLoading type={type} color={color} height={667} width={375} />
// );

  componentDidMount() {



 

  

    


    AsyncStorage.getItem("batchIN").then(batchIN => {
      if (batchIN) {

        this.setState(
          {
              isLoading: true,
          },
        )

        if (!this.alertPresent) {

          this.alertPresent = true;
        Alert.alert(
          "",
          "Do you want to continue with the Existing Shift(Batch)",
          [
            {
              text: "Yes",
              onPress: () => this.navigatetoDashboard(),
  
            },
            {
              text: "No",
              onPress: () => this.cancenTapped(),
            }
          ],
          {
            cancelable: false
          }
        )
        }
        else{

          this.alertPresent = false;
        }


        //alert(datastore)
        // this.setState({ batchIN: batchIN }, this.navigatetoDashboard());
      }
     
    });

   console.log(JSON.stringify(AsyncStorage.getAllKeys()))

    this.textInput.clear()

    
  
    this.setState({
      name: "",
      email: "",
      storeID: "",
      password: ""
    })
    // this.clearAsyncStorage()
   

  }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

cancenTapped = () => {

  this.setState({
    isLoading : false
  })
  AsyncStorage.clear()
}

  keyboardHidefunction = () => {

    Keyboard.dismiss()

  }


  onLoginPress = () => {

    // this.navigatetoDashboard();

    

    const { email } = this.state;
    const { password } = this.state;
    const { storeID } = this.state;
    if (email == "") {
      Alert.alert("Please enter valid email")
      return
    }
    else if (storeID == "") {
      Alert.alert("Please enter valid Store-ID")
      return

    } else if (password == "") {
      Alert.alert("Please enter valid password")
      return

    }

    else {

     

      API_URL = LOGIN_BASE_URL + "authenticate_new_data";



      fetch(API_URL, {
        
        
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          sid: this.state.storeID
        })
      })
        .then(response => response.json())
        .then(responseJson => {

      
       
          //   this.refs.loading.show(false);
          if (responseJson.error) {
            // this.setState({ msg: "Username or password not match" });

            Alert.alert(responseJson.error)

          } else if (responseJson.token) {
            AsyncStorage.setItem("token", responseJson.token);
            AsyncStorage.setItem("storeID", this.state.storeID);
            this.loginWithToken();
          }

        }
        )
        .catch(error => {
          console.error(error);
        });

    }

  }

  loginWithToken = () => {



    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("storeID").then(storeID => {
        this.setState({
          isLoading:true
        })
        if (data) {

          var date = moment()

            .format("MM-DD-YYYY");
          API_URL = LOGIN_BASE_URL1 + `${encodeURIComponent(data)}&date=${date}&sid=${storeID}`;

          fetch(API_URL, {
            method: "GET"
          })

            .then(response => response.json())
            .then(responseJson => {
              // this.refs.loading.show(false);
              // if (responseJson.error) {
              //   this.sessionButton();
              // }
              this.setState({
                isLoading:false
              })
              if (responseJson.user.email) {
                AsyncStorage.setItem("fname", responseJson.user.fname);
                AsyncStorage.setItem("lname", responseJson.user.lname);
                AsyncStorage.setItem("emailid", responseJson.user.email);
                AsyncStorage.setItem("userId", JSON.stringify(responseJson.user.iuserid));
                AsyncStorage.setItem("id", JSON.stringify(responseJson.user.id));
                 
                AsyncStorage.setItem(
                  "Storename",
                  responseJson.user.stores[0].name
                );

                AsyncStorage.setItem(
                  "SID",
                  JSON.stringify(responseJson.user.stores[0].SID)
                );


                // this.navigatetoDashboard();
                this.loginWithBatchIn()
              }
              Keyboard.dismiss();
            })
            .catch(error => {
              alert("Something went wrong! Please try again later!!!!");


            });
        }
      });
    });
  }

  loginWithBatchIn = () => {


    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("SID").then(storeID => {
        if (data) {

          API_URL = LOGIN_BatchIn + `${encodeURIComponent(data)}&sid=${storeID}`;

          fetch(API_URL, {
            method: "GET"
          })

            .then(response => response.json())
            .then(responseJson => {
              // this.refs.loading.show(false);
           
              // if (responseJson.error) {
              //   this.sessionButton();

              // 
              // this.setState({
              //   email:"",
              //   password:"",
              //   storeID:""
              // })
              if (responseJson.data) {

        
                AsyncStorage.setItem("batchIN", responseJson.data.batch_id);
                this.navigatetoDashboard();
              }
            
              Keyboard.dismiss();
            }
            )
          .catch(error => {
            alert("Something went wrong! Please try again later!!!!");


          });
        }
      });
    });

  }

  navigatetoDashboard = () => {
    this.setState(
      {
          isLoading: false,
      },
    )

    this.props.navigation.navigate('Dashboard');
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
      <KeyboardAwareScrollView>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        {}
          <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', marginTop: "25%" }}>
            <Image
              source={require('../Images/poslogo.jpg')}
              resizeMode='contain'
              style={{
                flex: 1,
                width: 300,
                height: 150,
              }}
            />
            <Text style={styles.text}>Built By Retailers,for Retailers </Text>

            <TextInput style={styles.input}
              placeholder="Name"
              color='black'
              placeholderTextColor="#808080"
              underlineColorAndroid="transparent"
              
              autoCapitalize="none"
              // returnKeyType="next"
              autoCorrect={false}
              onChangeText={name => this.setState({ name })} />
            <TextInput ref={name => { this.textInput = name }} />

            <TextInput style={styles.input}
              placeholder="Email"
              color='black'
              placeholderTextColor="#808080"
              
              autoCapitalize="none"
              // returnKeyType="next"
              value={this.state.email}
              autoCorrect={false}
              onChangeText={email => this.setState({ email })} />
            <TextInput ref={email => { this.textInput = email }} />

            <TextInput style={styles.input}
              placeholder="Store Id"
              placeholderTextColor="#808080"
              color='black'
              autoCapitalize="none"
              returnKeyType='done'
              value={this.state.storeID}
              keyboardType="number-pad"
              onSubmitEditing={() => this.keyboardHidefunction()}
              // returnKeyType="next"
              autoCorrect={false}
              onChangeText={storeID => this.setState({ storeID })} />
            <TextInput ref={storeID => { this.textInput = storeID }} />

            <TextInput style={styles.input}
              placeholder="Line Buster Password"
              placeholderTextColor="#808080"
              color='black'
              autoCapitalize="none"
              value={this.state.password}
              returnKeyType="done"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })} />
            <TextInput ref={password => { this.textInput = password }} />


            <TouchableOpacity
              style={styles.btncontainer}
              onPress={this.onLoginPress}
            >
              <Text style={styles.btntext}>Start Busting Lines</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };

}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "#fff",
    padding: 10,

  },
  text: {
    fontSize: 20,
    marginTop: 20,
    marginStart: 20,
    color: "#f46a1d",
    // fontWeight: "bold",
    marginBottom: 30,
  },
  btncontainer: {
    backgroundColor: "#f17a2c",
    borderRadius: 50,
    height: 40,
    // marginStart: "28%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // marginBottom: 30
  },
  btntext: {
    //textAlign : 'center',
    fontSize: 20,
    alignItems: "center",
    color: "#fff"
  }
});
