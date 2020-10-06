// import React from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     Image,
//     Button,
//     TouchableOpacity,
//     FlatList,
//     Alert
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import Dialog, { DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import CardView from 'react-native-cardview';
// import { RNCamera } from 'react-native-camera';

// const ScanDilaoge = (props) => {

//     // Alert.alert(props.var1)
//     console.log(props.var1.onPress);

//     return (
        
//         <Dialog height="70%" width="90%"
//             visible={props.var1}
//             onTouchOutside={() => {
//                 this.setState({ visible1: true });
//             }}
//         >
//             <ScrollView>
//                 <DialogContent>
//                     <View style={{ flex: 1, backgroundColor: "#fff", marginTop: "5%" }}>
//                         <View style={{ marginTop: "5%", marginBottom: "10%" }}>
//                             <Text onPress={() => { this.setState({ visible1: false }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>
//                             <Text style={styles.text}>Scan New Item</Text>
//                         </View>
//                         <TextInput style={styles.taxableinput} placeholder="$0,000.00" placeholderTextColor="#f15a2c" textAlign='center' editable='false' />
//                         <View style={{ flexDirection: "row", height: "15%" }}>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>1</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>2</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>3</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ flexDirection: "row", height: "15%" }}>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>4</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>5</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>6</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ flexDirection: "row", height: "15%" }}>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>7</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>8</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>9</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ flexDirection: "row", height: "15%" }}>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainerblank}

//                             >
//                                 <Text style={styles.taxablebtntext}></Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}

//                             >
//                                 <Text style={styles.taxablebtntext}>0</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.taxablebtncontainer}
//                             //  onPress={this.Nextscreen}
//                             >
//                                 <Text style={styles.taxablebtntext}>9</Text>
//                             </TouchableOpacity>

//                         </View>
//                         <View style={{ flexDirection: "row", height: "10%", marginBottom: '10%' }}>
//                             <TouchableOpacity
//                                 style={styles.taxableitemBtnContainer}
//                             // onPress={this.homeScreen}
//                             >
//                                 <Text style={styles.taxableitembtntext}>Add Item</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                 </DialogContent>
//             </ScrollView>
//         </Dialog>

//     );
// }

// const styles = StyleSheet.create({
//     taxablecontainer: {
//         flex: 1,
//         backgroundColor: "#fff"
//     },
//     text: {
//         //marginLeft: 20,
//         fontSize: 18,
//         // marginTop: 20,
//         marginStart: 10,
//         color: "#696969",
//         fontWeight: "600",
//         marginBottom: 30,
//     },
//     taxablebtncontainer: {
//         backgroundColor: "#fff",
//         borderRadius: 1000,
//         width: "17%",
//         height: "54%",
//         margin: "7%",
//         backgroundColor: '#fff',
//         shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
//         shadowOpacity: 0.6,
//         shadowRadius: 2,
//         shadowOffset: {
//             height: 1,
//             width: 1
//         },

//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 10,
//         padding: 0,
//     },
//     taxablebtncontainerblank: {
//         // backgroundColor: "#fff",
//         // borderRadius: 1000,
//         width: "17%",
//         height: "54%",
//         margin: "7%",
//         // backgroundColor: '#fff',
//         shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",


//     },
//     taxableitemBtnContainer: {
//         backgroundColor: "#f17a2c",
//         borderRadius: 50,
//         height: 40,
//         marginLeft: 10,
//         width: "90%",
//         alignItems: "center",
//         justifyContent: "center",
//         // marginTop:10,
//         // marginBottom: 30
//     },
//     taxableitembtntext: {
//         //textAlign : 'center',
//         fontSize: 17,
//         alignItems: "center",
//         color: "#fff",
//     },
//     taxablebtntext: {
//         //textAlign : 'center',
//         fontSize: 17,
//         alignItems: "center",
//         color: "#f15a2c",
//     },
//     taxablelabelText: {
//         //marginLeft: 20,
//         fontSize: 18,
//         // marginTop: 20,
//         marginStart: 10,
//         color: "#696969",
//         fontWeight: "600",
//         marginBottom: 20,
//     },
//     taxableiconText: {
//         fontSize: 25,
//         // marginTop: 20,
//         //  marginTop:10,
//         marginLeft: "90%",
//         color: "red",
//         fontWeight: "bold",
//         // marginBottom: -20,
//     },
//     taxableinput: {

//         fontSize: 20,
//         marginLeft: 20,
//         height: 40,
//         width: "90%",
//         borderColor: "#f15a2c",
//         borderWidth: 1,
//         marginBottom: 15,
//         borderRadius: 20,
//         shadowColor: "#fff",
//         padding: 10,

//     },

// })


// export default ScanDilaoge;

// import React from 'react'
// import {
//   TextInput,
//   StyleSheet,
//   Button,
//   View,
//   Image,
//   Text,
//   ImageBackground,
//   KeyboardAvoidingView,
//   TouchableOpacity,
//   StatusBar,
//   Platform,
//   SafeAreaView,
//   AsyncStorage,
//   Alert,
//   Keyboard

// } from 'react-native'
// //import Keyboard from 'react-native-keyboard';
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
// import { ScrollView } from 'react-native-gesture-handler';
// import CardView from 'react-native-cardview';
// import { RNCamera } from 'react-native-camera';



// export default class ScanDilaoge extends React.Component {

//     state = {
//         data: {
//             name: "",
//             qty: "",
//             visible: false
//         },

//     };

//     constructor(props) {
//         super(props)
//         this.state = {
//             camera: {
//                 type: RNCamera.Constants.Type.back,
//                 flashMode: RNCamera.Constants.FlashMode.auto,
//                 barcodeFinderVisiable: true
//             },
//             visible: false,
//             visible1: false


//         }

//     }

//   componentDidMount() {

//     Keyboard.dismiss()
//   }
//   homeScreen = () => {
//     //this.refs.loading.show(false);
//    // this.props.navigation.navigate('Dashboard');
//   }
//   render() {
//     return (
//         <TouchableOpacity
//         style={styles.btncontainer}
//         onPress={() => {
//             this.setState({ visible1: true });
//         }}
//     >
//                 <Dialog height="70%" width="90%"
//                                 visible={this.state.visible1}
//                                 onTouchOutside={() => {
//                                     this.setState({ visible1: true });
//                                 }}
//                             >
//                                 <ScrollView>
//                                     <DialogContent>
//                                         <View style={{ flex: 1, backgroundColor: "#fff", marginTop: "5%" }}>
//                                             <View style={{ marginTop: "5%", marginBottom: "10%" }}>
//                                                 <Text onPress={() => { this.setState({ visible1: false }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>
//                                                 <Text style={styles.text}>Scan New Item</Text>
//                                             </View>
//                                             <TextInput style={styles.taxableinput} placeholder="$0,000.00" placeholderTextColor="#f15a2c" textAlign='center' editable='false' />
//                                             <View style={{ flexDirection: "row", height: "15%" }}>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>1</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>2</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>3</Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                             <View style={{ flexDirection: "row", height: "15%" }}>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>4</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>5</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>6</Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                             <View style={{ flexDirection: "row", height: "15%" }}>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>7</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>8</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>9</Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                             <View style={{ flexDirection: "row", height: "15%" }}>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainerblank}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}></Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}

//                                                 >
//                                                     <Text style={styles.taxablebtntext}>0</Text>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     style={styles.taxablebtncontainer}
//                                                 //  onPress={this.Nextscreen}
//                                                 >
//                                                     <Text style={styles.taxablebtntext}>9</Text>
//                                                 </TouchableOpacity>

//                                             </View>
//                                             <View style={{ flexDirection: "row", height: "10%", marginBottom: '10%' }}>
//                                                 <TouchableOpacity
//                                                     style={styles.taxableitemBtnContainer}
//                                                     onPress={this.homeScreen}
//                                                 >
//                                                     <Text style={styles.taxableitembtntext}>Add Item</Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                         </View>

//                                     </DialogContent>
//                                 </ScrollView>
//                             </Dialog> 
//                             </TouchableOpacity>
//     );
//   }


// }

// const styles = StyleSheet.create({
//     taxablecontainer: {
//         flex: 1,
//         backgroundColor: "#fff"
//     },
//     text: {
//         //marginLeft: 20,
//         fontSize: 18,
//         // marginTop: 20,
//         marginStart: 10,
//         color: "#696969",
//         fontWeight: "600",
//         marginBottom: 30,
//     },
//     taxablebtncontainer: {
//         backgroundColor: "#fff",
//         borderRadius: 1000,
//         width: "17%",
//         height: "54%",
//         margin: "7%",
//         backgroundColor: '#fff',
//         shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
//         shadowOpacity: 0.6,
//         shadowRadius: 2,
//         shadowOffset: {
//             height: 1,
//             width: 1
//         },

//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 10,
//         padding: 0,
//     },
//     taxablebtncontainerblank: {
//         // backgroundColor: "#fff",
//         // borderRadius: 1000,
//         width: "17%",
//         height: "54%",
//         margin: "7%",
//         // backgroundColor: '#fff',
//         shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",


//     },
//     taxableitemBtnContainer: {
//         backgroundColor: "#f17a2c",
//         borderRadius: 50,
//         height: 40,
//         marginLeft: 10,
//         width: "90%",
//         alignItems: "center",
//         justifyContent: "center",
//         // marginTop:10,
//         // marginBottom: 30
//     },
//     taxableitembtntext: {
//         //textAlign : 'center',
//         fontSize: 17,
//         alignItems: "center",
//         color: "#fff",
//     },
//     taxablebtntext: {
//         //textAlign : 'center',
//         fontSize: 17,
//         alignItems: "center",
//         color: "#f15a2c",
//     },
//     taxablelabelText: {
//         //marginLeft: 20,
//         fontSize: 18,
//         // marginTop: 20,
//         marginStart: 10,
//         color: "#696969",
//         fontWeight: "600",
//         marginBottom: 20,
//     },
//     taxableiconText: {
//         fontSize: 25,
//         // marginTop: 20,
//         //  marginTop:10,
//         marginLeft: "90%",
//         color: "red",
//         fontWeight: "bold",
//         // marginBottom: -20,
//     },
//     taxableinput: {

//         fontSize: 20,
//         marginLeft: 20,
//         height: 40,
//         width: "90%",
//         borderColor: "#f15a2c",
//         borderWidth: 1,
//         marginBottom: 15,
//         borderRadius: 20,
//         shadowColor: "#fff",
//         padding: 10,

//     },

// })

 

