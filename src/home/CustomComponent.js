import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    AsyncStorage
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerItems, SafeAreaView } from 'react-navigation';

export default class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

  
    
    
    toggleDrawer = () => {

       // console.log(this.props.navigationProps);

        this.props.navigationProps.toggleDrawer();


    }

    onUnholdPress = () =>{
        this.props.navigation.navigate('Dashboard' ,  {
            unhold:"unhold",
            unholdVisibleView:true,
            
      
          })
          this.props.navigation.closeDrawer()

    }
  
    onLoginPress = () => {


     //   Alert.alert("shdjsdj")
     this.props.navigation.navigate('Dashboard' ,  {
        hold:"hold",
        holdVisibleView:true,
        holdVisibleView1:false,
  
      })
        
        this.props.navigation.closeDrawer()
        // Alert.alert("Under Development")
    }


    voidTapped = () => {


        //   Alert.alert("shdjsdj")
        this.props.navigation.navigate('Dashboard' ,  {
           void:"void",
        //    holdVisibleView:true,
        //    holdVisibleView1:false,
     
         })
           
           this.props.navigation.closeDrawer()
           // Alert.alert("Under Development")
       }


       onPriceCheckPress = () => {
        this.props.navigation.navigate('Dashboard' ,  {
            pricecheck:true,
         //    holdVisibleView:true,
         //    holdVisibleView1:false,
      
          })
            
            this.props.navigation.closeDrawer()

    }

 

    onCouponTapped = () => {

        this.props.navigation.navigate('Dashboard' ,  {
            couponvalue:true,
            numberDisplayArr:"",
            couponData:"couponData"
         //    holdVisibleView:true,
         //    holdVisibleView1:false,
      
          })
            
            this.props.navigation.closeDrawer()

    }

    batchOutPress = () => {
       
        this.props.navigation.navigate('Dashboard' ,  {
            batchout:"batchout",
            
          })
            
            this.props.navigation.closeDrawer()
    }

    logoutTapped = () => {

        AsyncStorage.clear()
        this.props.navigation.navigate('Login')
    }

    render() {
        console.log(this.props);
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.containertopRow}>
                <TouchableOpacity onPress = {()=>this.props.navigation.closeDrawer()}>
           <Ionicons name="menu" size={30} color="#f15a2c"/> 
           </TouchableOpacity>
               
                </View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity
                    
                        style={styles.btncontainer}
                      //  onPress={() => this.props.navigation.navigate('Dashboard')}
                        onPress={() => this.onLoginPress()}
                        
                        

                    >
                        <Text style={styles.btntext}>Hold</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Unhold')}
                        // onPress={() => Alert.alert("In Progress")}
                        onPress={() => this.onUnholdPress()}
                    >
                        <Text style={styles.btntext}>UnHold</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Void')}
                        // onPress={() => Alert.alert("Under Development")}
                        onPress={() => this.voidTapped()}
                    >
                        <Text style={styles.btntext}>Void</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Coupon')}
                        // onPress={() => Alert.alert("Under Development")}
                        onPress={() => this.onCouponTapped()}
                    >
                        <Text style={styles.btntext}>Coupon</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Recipt')}
                        // onPress={() => Alert.alert("Under Development")}
                        onPress={() => this.onReciptPress()}
                    >
                        <Text style={styles.btntext}>Receipt</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('PriceCheck')}
                        // onPress={() => Alert.alert("Under Development")}
                        onPress={() => this.onPriceCheckPress()}
                    >
                        <Text style={styles.btntext}>Price Check</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Setting')}
                        onPress={() => Alert.alert("Under Development")}
                    >
                        <Text style={styles.btntext}>Setting</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('BatchIn')}
                        onPress={() => Alert.alert("Under Development")}
                    >
                        <Text style={styles.btntext}>Batch In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('BatchOut')}
                        // onPress={() => Alert.alert("Under Development")}
                        onPress={() => this.batchOutPress()}
                    >

                        <Text style={styles.btntext}>Batch Out</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.btncontainer}
                        // onPress={() => this.props.navigation.navigate('Login')}
                        onPress={() => this.logoutTapped()}
                    >
                        <Text style={styles.btntext}>Logout</Text>
                    </TouchableOpacity>





                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBECF0'
    },
    containertopRow: {
        
        marginTop: 50,
        marginLeft: 50,
        marginLeft:170
        // justifyContent: "end",
        // alignItems: 'end'
    },
    txtBottom: {
        marginLeft: 10,
        color: '#E6FAFF',
        fontSize: 15,
        fontWeight: '100'
    },
 
   
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    containertopRowText: {
        flexDirection: 'column',
        marginLeft: 5
    },
    btncontainer: {
        backgroundColor: "#fff",
        borderRadius: 200,
        height: 40,
        marginStart: "28%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        // marginBottom: 30
    },
    btntext: {
        //textAlign : 'center',
        fontSize: 16,
        alignItems: "center",
        color: "#f15a2c"
    },

 
    containerBottomItem: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomColor: '#E6FAFF',
        borderBottomWidth: 0.5
    }
});