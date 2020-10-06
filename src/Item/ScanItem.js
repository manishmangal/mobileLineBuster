import React from 'react'
import {
    TextInput,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { RNCamera } from 'react-native-camera';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CardView from 'react-native-cardview';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default class ScanItem extends React.Component {

    constructor(props) {
        super(props)
        let { width } = Dimensions.get('window');
        this.maskLength = (width * 85) / 100;
        this.camera = null;
        // this.barcodeCodes = [];
        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisiable: true
            },
            visible: false,
            


        }

    }
    onBarCodeRead(scanResult) {

        if (this.state.barCodeScanned == false) {
            return
        }
    }
    homeScreen = () => {

        this.props.navigation.navigate('Login');
    }
    render() {
        return (


            <ScrollView style={{ flex: 1, backgroundColor: "#fff", }}>




               
                    <View style={{ flex: 1, marginTop: '20%' }}>

                        <Text style={styles.iconText}> <MaterialIcons name="cancel" size={22} color="#696969" onPress={() => this.props.navigation.navigate('Dashboard')} /></Text>
                        <Text style={styles.text}>Scan New Item</Text>
                        <TextInput style={styles.input} placeholder="Enter Item Name" placeholderTextColor="#f15a2c" />

                        <TextInput style={styles.input} placeholder="Enter Barcode" placeholderTextColor="#f15a2c" />

                        <CardView

                            cardElevation={6}
                            cardMaxElevation={1}
                            cornerRadius={3}
                            style={{ margin: 10 }}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                                barcodeFinderWidth={280}
                                barcodeFinderHeight={220}
                                barcodeFinderBorderColor="green"
                                barcodeFinderBorderWidth={2}
                                defaultTouchToFocus
                                flashMode={this.state.camera.flashMode}
                                mirrorImage={false}
                                onBarCodeRead={this.onBarCodeRead.bind(this)}
                                onFocusChanged={() => { }}
                                onZoomChanged={() => { }}
                                // permissionDialogTitle={'Permission to use camera'}
                                // permissionDialogMessage={'We need your permission to use your camera phone'}
                                style={styles.preview}
                                type={this.state.camera.type}>
                                <View style={styles.overlay} />
                                <View style={[styles.contentRow, { height: 190, }]}>
                                    <View style={styles.overlay} />
                                    <View style={[styles.content, { width: 300, height: 190 }]} />
                                    <View style={styles.overlay} />
                                </View>
                                <View style={styles.overlay} />

                            </RNCamera>
                        </CardView>

                    </View>
              
            </ScrollView>


        );
    };

}

const styles = StyleSheet.create({
    scaninput: {
        //  flex: 1,
        // marginTop:60,
        marginLeft: 20,
        height: 40,
        width: "90%",
        borderColor: "#f15a2c",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: "#fff",
        padding: 10,

    },
    scantext: {
        //marginLeft: 20,
        fontSize: 18,
        // marginTop: 20,
        marginStart: 10,
        color: "#696969",
        fontWeight: "600",
        marginBottom: 30,
    },
    scaniconText: {
        fontSize: 20,
        // marginTop: 20,
        //  marginTop:10,
        marginLeft: "90%",
        color: "red",
        fontWeight: "bold",
        marginBottom: 0,
    },
    scanbtncontainer: {
        backgroundColor: "#f15a2c",
        borderRadius: 50,
        height: 40,
        // marginStart: "28%",
        width: "65%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    scanbtntext: {
        //textAlign : 'center',
        fontSize: 20,
        alignItems: "center",
        color: "#fff"
    },
    scanpreview: {
        width: this.maskLength,
        height: 200,
        alignItems: 'center'

    },
    scanoverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    scancontentRow: {
        flexDirection: 'row',
    },

    scancontent: {
        borderWidth: 2,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
