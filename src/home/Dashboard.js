import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
  Alert,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
  Vibration,
  ActivityIndicator

} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment'
import Dialog, { DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardView from 'react-native-cardview';
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationEvents, ThemeColors } from 'react-navigation'
import { RNCamera } from 'react-native-camera';
import MaterialTabs from "react-native-material-tabs";
import { SectionGrid } from "react-native-super-grid";
import SearchableDropdown from 'react-native-searchable-dropdown';
import CustomComponent from './CustomComponent'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "./Logo";
import { color } from "react-native-reanimated";
import BatchIn from "./BatchIn";
let numberDisplayArr = "";
let subTotal;
let taxPriceLabel, taxPriceValue = 0, nettotal = 0, taxableFieldValue = 0;
export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    let { width } = Dimensions.get('window');
    this.maskLength = (width * 85) / 100;
    this.camera = null;
    this.barcodeCodes = [];
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      },
      //barCodeScanned: true,
      visible: false,
      visible1: false,
      barCodeScanned: true,
      updateQtyVisible: false,
      quickItemView: false,
      holdVisibleView: false,
      unholdVisibleView: false,
      pricecheck: false,
      cancel: false,
      hold: "",
      unhold: "",
      unholdListArray: "",
      ItemArray: [],
      itemIndex: "",
      totalPriceField: "",
      testVariable: "",
      item: "",
      cost: "",
      qoh: "",
      todatDate: moment().format('MMMM D, YYYY | hh:mmA'),
      finalTaxValue: "",
      taxPrice: "",
      itemName: "",
      taxable: "",
      numberArr: [],
      taxView: false,
      nonTaxView: false,
      qtyUpdateView: false,
      scanItemView: false,
      selectedRow: -1,
      qty: "1",
      updateRow: false,
      updateItem: [],
      barcode: "",
      SalesPriceData: "",
      itemBarcode: "",
      taxValue: "",
      taxValue1: "",
      taxValue2: "",
      taxValue3: "",
      selectedTab: 0,
      subtotalView: false,
      tax1rate: 0,
      tax2rate: 0,
      tax3rate: 0,
      totalTax: 0,
      serverData: [],
      quickItemData: [],
      token: "",
      SID: "",
      sname: "",
      test: true,
      holdInputValue: "",
      unholderName: "",
      unHoldID: "",
      void: "",
      smsView: false,
      sendInputValue: "",
      itemCategory: "",
      itemDepartment: "",
      itemPrice: "",
      itemCost: "",
      itemQOH: "",
      priceitemname: "",
      itemDetails: false,
      couponvalue: false,
      BatchInValue: "",
      batchout: "",
      isLoading: false,
      salesID: "",
      couponData: ""



    }
  }

  onBarCodeRead(scanResult) {

    if (this.state.barCodeScanned == false) {
      return
    }

    //Alert.alert(scanResult.data)


    Vibration.vibrate()

    // this.setState({
    //   barcode: scanResult.data
    // },this.ItemScanBtnTapped())


    this.state.barcode = scanResult.data


    this.ItemScanBtnTapped()

    this.state.barCodeScanned = false

    //if (this.state.barcode != '') this.Nextscreen();



    // this.setState({ 'barcode': "2" })

    // Alert.alert(this.state.barcode)
    // console.log(scanResult)

    //Alert.alert(scanResult)
  }

  // refresh() {
  //   Alert.alert("jshjshjsdjhsdjhsjdhsjd")
  // }

  componentDidMount() {




    // AsyncStorage.getItem("test").then(test => {
    //   if (test) {
    //     //alert(datastore)
    //     this.setState({ test: test });
    //   }
    // });



    //  const test = this.props.navigation.getParam('test');
    //  this.setState({
    //    test:test
    //  })


    this.setState({ 'barcode': "" })
    this.state.barCodeScanned = true

    AsyncStorage.getItem("Storename").then(datastore => {
      if (datastore) {
        //alert(datastore)
        this.setState({ sname: datastore });
      }

    });

    AsyncStorage.getItem("batchIN").then(batchIN => {
      if (BatchInValue) {
        //alert(datastore)
        this.setState({ BatchInValue: BatchInValue });
      }
      Alert.alert(this.state.BatchInValue)
    });








    AsyncStorage.getItem("token").then(token => {

      this.setState({
        token: token
      })
    })

    AsyncStorage.getItem("SID").then(SID => {

      this.setState({
        SID: SID
      })
    })





    AsyncStorage.getItem("token").then(token => {
      AsyncStorage.getItem("SID").then(SID => {


        fetch(ApiBaseUrl + `get_tax_values?token=${token}&sid=${SID}`, {
          //  fetch(`https://devportal.albertapayments.com/api/admin/get_sku_user?sku=1&sid=1001&user_id=4&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU4MjYyODI1NCwiZXhwIjoxNTg1MjIwMjU0LCJuYmYiOjE1ODI2MjgyNTQsImp0aSI6IjRmNGNhMGMyYTJjYzQ5NDMzMGRmOWRiNjIzODQ4Y2I2In0.xoxoFWsI1zw3X3jMRlCgwcF2bIJj9eNn-wRHTpw0qqQ`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);

            //console.log(responseJson)


            if (responseJson.data) {

              if (responseJson.data[0].vtaxcode == "TAX1" && responseJson.data[0].ntaxrate > 0) {

                this.setState({
                  tax1rate: responseJson.data[0].ntaxrate
                })

              }

              if (responseJson.data[1].vtaxcode == "TAX2" && responseJson.data[1].ntaxrate > 0) {

                this.setState({
                  tax2rate: responseJson.data[1].ntaxrate
                })

              }
              if (responseJson.data[2].vtaxcode == "TAX3" && responseJson.data[2].ntaxrate > 0) {

                this.setState({
                  tax3rate: responseJson.data[1].ntaxrate
                })

              }
            }

          })
          .catch((error) => {
            console.error(error)
          }

          );
      })
    })


    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {

        this.setState({
          isLoading: true
        })

        const url = "https://devportal.albertapayments.com/api/" + 'admin/new_get_item_with_name?sid='
        fetch(url + SID + "&token=" + data)
          .then(response => response.json())
          .then(responseJson => {

            this.setState({
              isLoading: false
            })
            //Successful response from the API Call
            this.setState({
              serverData: [...responseJson.item_data],
              //adding the new data in Data Source of the SearchableDropdown
            });

          })
          .catch(error => {
            console.error(error);
          })
      })
    })


    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {
        this.setState({
          isLoading: true
        })

        const url = "https://devportal.albertapayments.com/api/" + 'admin/quickitem_with_name_a?sid='
        fetch(url + SID + "&token=" + data)
          .then(response => response.json())
          .then(responseJson => {

            this.setState({
              isLoading: false
            })
            //Successful response from the API Call
            this.setState({
              quickItemData: [...responseJson],
              //adding the new data in Data Source of the SearchableDropdown
            });

          })
          .catch(error => {
            console.error(error);
          })
      })
    })



    this.unHoldList()

  }

  quickItemDataChange = (number) => {

    // Alert.alert(number)

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {



        const url = "https://devportal.albertapayments.com/api/" + 'admin/quickitem_with_all?sid='
        fetch(url + SID + "&token=" + data + "&key=" + number)
          .then(response => response.json())
          .then(responseJson => {


            //Successful response from the API Call
            this.setState({
              quickItemData: [...responseJson],
              //adding the new data in Data Source of the SearchableDropdown
            });

          })
          .catch(error => {
            console.error(error);
          })
      })
    })

  }



  priceCheckTapped = () => {

    // Alert.alert(this.state.barcode)

    console.log(this.state.ItemArray)
    this.state.barCodeScanned = true
    this.props.navigation.setParams({ holdVisibleView: false, hold: "", void: "", pricecheck: false })

    if (this.state.taxView == true) {

      //alert(this.state.SalesPriceData)
    }

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem('SID').then(Sid => {

        this.setState({
          isLoading: true
        })

        fetch("https://devportal.albertapayments.com/api/" + `admin/checkPriceBySKU_new?sku=${this.state.barcode}&token=${data}&sid=${Sid}`, {
          method: 'GET',

        }).then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);
            //console.log(responseJson)
            this.setState({
              isLoading: false
            })

            this.state.barCodeScanned = true


            if (responseJson.data) {

              this.setState({
                priceitemname: responseJson.data[0].vitemname,
                itemBarcode: responseJson.data[0].vbarcode,
                itemCategory: responseJson.data[0].vcategoryname,
                itemDepartment: responseJson.data[0].vdepartmentname,
                itemPrice: responseJson.data[0].dunitprice,
                itemCost: responseJson.data[0].dcostprice,
                itemQOH: responseJson.data[0].iqtyonhand,
                itemDetails: true
                // itemWOQ: responseJson.data[0].vbarcode,
                // itemProfitMarg: responseJson.data[0].vbarcode,


              })
            }
            if (responseJson.error) {
              //this.refs.loading.show(false);

              Alert.alert(

                '',
                'Sorry, this barcode not present in the database',
                [
                  { text: 'OK', },
                ]
              )
              return;
            }

            else if (responseJson.error == 'Token is Invalid') {
              //this.sessionButton()

            }
            // Keyboard.dismiss();
          })
          .catch((error) => {
            console.error(error)
          });

        this.setState({
          barcode: "",
          scanItemView: false

        })
      })
    })


    // Alert.alert(this.state.barcode)

  }


  ItemScanBtnTapped = () => {

    // Alert.alert(this.state.barcode)

    // console.log(this.state.ItemArray)


    numberDisplayArr = ""

    console.log(numberDisplayArr)

    this.setState({
      scanItemView: false
    })
    this.state.barCodeScanned = true
    this.props.navigation.setParams({ holdVisibleView: false, hold: "", void: "", couponvalue: false })


    // this.setState({
    //   holdVisibleView: false,
    //   hold: "",
    //   cancel: true
    // })
    if (this.state.taxView == true) {

      //alert(this.state.SalesPriceData)
    }

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem('SID').then(Sid => {

        // this.setState({
        //   isLoading: true
        // })

        fetch("https://devportal.albertapayments.com/api/" + `admin/checkPriceBySKU_new?sku=${this.state.barcode}&token=${data}&sid=${Sid}`, {
          method: 'GET',

        }).then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);
            //console.log(responseJson)

            this.setState({
              // isLoading: false,
              scanItemView: false
            })
            this.state.barCodeScanned = true
            if (responseJson.status) {

              if (this.state.taxView == true || this.state.nonTaxView == true) {

                this.state.SalesPriceData = this.state.SalesPriceData

              }
              else if (this.state.couponData == "couponData") {
                // 
                //  this.state.SalesPriceData = parseFloat(-this.state.SalesPriceData).toFixed(2)
                this.state.SalesPriceData = parseFloat(-this.state.SalesPriceData) + ".00"
                this.setState({
                  taxView: false,
                  nonTaxView: false
                })
                this.props.navigation.setParams({ couponData: false })

              }

              else {
                this.state.SalesPriceData = responseJson.data[0].dunitprice

              }



              // if (this.state.nonTaxView == true) {

              //   this.state.SalesPriceData = this.state.SalesPriceData

              // }

              // else({
              //   SalesPriceData: responseJson.data[0].dunitprice,
              // })

              this.setState({
                itemName: responseJson.data[0].vitemname,
                SalesPriceData: this.state.SalesPriceData,
                itemBarcode: responseJson.data[0].vbarcode,
                taxValue1: responseJson.data[0].vtax1,
                taxValue2: responseJson.data[0].vtax2,
                taxValue3: responseJson.data[0].vtax3,
                taxValue: "N",
                totalTax: parseFloat(0)

              })

              if (this.state.taxValue1 == "Y" || this.state.taxValue2 == "Y" || this.state.taxValue3 == "Y") {

                this.setState({
                  taxValue: "Y",

                })

                if (this.state.taxValue1 == "Y") {

                  this.state.totalTax += parseFloat(this.state.SalesPriceData) * parseFloat(this.state.tax1rate) / 100
                }

                if (this.state.taxValue2 == "Y") {

                  this.state.totalTax += parseFloat(this.state.SalesPriceData) * parseFloat(this.state.tax2rate) / 100
                }

                if (this.state.taxValue3 == "Y") {

                  this.state.totalTax += parseFloat(this.state.SalesPriceData) * parseFloat(this.state.tax3rate) / 100
                }


              }


              this.setState({
                ItemArray: [...this.state.ItemArray, { itemBarcode: this.state.itemBarcode + " @ $" + this.state.SalesPriceData, barcode: this.state.itemBarcode, totalPriceField: this.state.SalesPriceData, qty: 1, itemName: this.state.itemName, taxable: this.state.taxValue, priceValue: this.state.SalesPriceData, taxableField: this.state.totalTax }]
              }, () => {
                subTotal = this.state.ItemArray.reduce(function (prev, current) {
                  console.log(current.totalPriceField)
                  return prev - -current.totalPriceField
                }, 0);
                subTotal = (parseFloat(subTotal).toFixed(2))

                // if(this.state.couponvalue == true){

                //     subTotal = this.state.ItemArray.reduce(function (prev, current) {
                //       console.log(current.totalPriceField)
                //       return prev + -current.totalPriceField
                //     }, 0);
                //     subTotal = (parseFloat(subTotal).toFixed(2))
                //   }

                taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {
                  taxPriceValue = (parseFloat(current.taxableField) * parseFloat(current.qty))
                  return prev + +(taxPriceValue).toFixed(2)
                }, 0);
                taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))


                this.setState({
                  subTotal: subTotal,
                  taxPriceValue: taxPriceValue,
                  test: false


                })
              })

              console.log(this.state.ItemArray)

            }


            if (responseJson.error) {
              //this.refs.loading.show(false);

              Alert.alert(

                '',
                'Sorry, this barcode not present in the database',
                [
                  { text: 'OK', },
                ]
              )
              return;
            }

            else if (responseJson.error == 'Token is Invalid') {
              //this.sessionButton()

            }
            // Keyboard.dismiss();
          })
          .catch((error) => {
            console.error(error)
          });

        this.setState({
          barcode: "",
          scanItemView: false,
          test: false


        })
      })
    })


    // Alert.alert(this.state.barcode)

  }

  taxableBtnPress = () => {
    numberDisplayArr = "";
    // this.state.numberArr.length = 0;
  }



  unHoldList = () => {

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {
        fetch(ApiBaseUrl + `list_hold_data?token=${data}&sid=${SID}`, {
          //  fetch(`https://devportal.albertapayments.com/api/admin/get_sku_user?sku=1&sid=1001&user_id=4&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU4MjYyODI1NCwiZXhwIjoxNTg1MjIwMjU0LCJuYmYiOjE1ODI2MjgyNTQsImp0aSI6IjRmNGNhMGMyYTJjYzQ5NDMzMGRmOWRiNjIzODQ4Y2I2In0.xoxoFWsI1zw3X3jMRlCgwcF2bIJj9eNn-wRHTpw0qqQ`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);

            //console.log(responseJson)
            if (responseJson.data.length != 0) {
              this.setState({
                unholdListArray: responseJson.data
              })
            }
            if (responseJson.data == "No Hold Found!!") {

              this.setState({
                unholdListArray: ""
              })
            }

            // console.log(responseJson)




          })
          .catch((error) => {
            console.error(error)
          }

          );
      })
    })
  }

  reloadFlatList = () => {

    this.unHoldList()
    //this.state.ItemArray = ""
    this.props.navigation.setParams({ holdVisibleView: false, hold: "" })

    this.setState({
      ItemArray: "",
      // holdVisibleView:false,
      // hold:"",
      // holdInputValue:"",
      // cancel: true
    })

    // this.state.holdVisibleView = false
    // this.state.hold =""
    console.log(this.state.holdVisibleView)
  }

  batchOutLogout = () => {

    this.props.navigation.setParams({ batchout: "" })


    // const asyncStorageKeys = await AsyncStorage.getAllKeys();
    // if (asyncStorageKeys.length > 0) {
    //   if (Platform.OS === 'android') {
    //     await AsyncStorage.clear();
    //   }
    //   if (Platform.OS === 'ios') {
    //     await AsyncStorage.multiRemove(asyncStorageKeys);
    //   }
    // }
    // AsyncStorage.clear()
    this.props.navigation.navigate('Login')
    AsyncStorage.clear()


  }

  batchOutCancel = () => {

    this.props.navigation.setParams({ batchout: "" })

  }


  batchOutButtonTapped = () => {



    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {
        AsyncStorage.getItem('batchIN').then((batchIN) => {

          this.setState({
            isLoading: true
          })

          const url = "https://devportal.albertapayments.com/api/" + 'admin/batch_out?sid='
          fetch(url + SID + "&token=" + data + "&ibatchid=" + batchIN)
            .then(response => response.json())
            .then(responseJson => {

              this.setState({
                isLoading: false
              })


              if (responseJson.data) {

                Alert.alert(
                  "",
                  responseJson.data,
                  [
                    {
                      text: "OK",
                      onPress: () => this.batchOutLogout(),

                    },

                  ],
                )

              }


              //Successful response from the API Call


              // this.setState({
              //   serverData: [...responseJson.item_data],
              //   //adding the new data in Data Source of the SearchableDropdown
              // });

            })
            .catch(error => {
              console.error(error);
            })
        })
      })
    })


  }

  voidButtnTapped = () => {

    let { ItemArray: Items } = this.state



    Items = Items.map((item) => {

      // Alert.alert(JSON.stringify(item))

      this.props.navigation.setParams({ void: "" })
      return {

        SKU: item.barcode,
        qty: item.qty,
        // nordqty: item.qty_received,
        price: item.totalPriceField,
        tax: item.taxable,
        vitemname: item.itemName,

      }
    })






    let payTotalData = {
      "Totalitems": this.state.ItemArray.length,
      "SubTotal": this.state.subTotal,
      "tax_total": taxPriceLabel,
      "nnettotal": parseFloat(parseFloat(subTotal) + parseFloat(taxPriceLabel)).toFixed(2),
      "Items": Items
    }



    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("SID").then(datasid => {
        this.setState({
          isLoading: true
        })

        fetch("https://devportal.albertapayments.com/api/" + `admin/void_transaction?sid=${datasid}&token=${data}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(updatedData)

          body: JSON.stringify(payTotalData)
        }).then((response) => response.json())
          .then((responseJson) => {



            this.setState({
              isLoading: false
            })
            if (responseJson.data) {
              Alert.alert(
                "",
                responseJson.data,
                [
                  { text: 'OK', onPress: () => this.reloadFlatList() },

                ]
              )

            }
          })
          .catch((error) => {
            console.error(error);
            alert(error)
          });
      });
    })


  }


  smsButtonPress = () => {




    this.setState({
      smsView: true
    })


  }

  emailButtonPress = () => {



    Alert.alert("Under Development")
  }

  payButtonPress = () => {



    if (this.state.ItemArray.length == 0) {
      Alert.alert("Please enter item ")
      return
    }

    let { ItemArray: Items } = this.state



    Items = Items.map((item) => {

      // Alert.alert(JSON.stringify(item))

      return {

        SKU: item.barcode,
        qty: item.qty,
        // nordqty: item.qty_received,
        price: item.totalPriceField,
        tax: item.taxable,
        vitemname: item.itemName,

      }
    })



    let payTotalData = {
      "Totalitems": this.state.ItemArray.length,
      "SubTotal": this.state.subTotal,
      "tax_total": taxPriceLabel,
      "nnettotal": parseFloat(parseFloat(subTotal) + parseFloat(taxPriceLabel)).toFixed(2),
      "Items": Items
    }



    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("SID").then(datasid => {
        AsyncStorage.getItem("userId").then(userId => {
          // this.setState({
          //   isLoading:true
          // })
          fetch("https://devportal.albertapayments.com/api/" + `admin/insert_transaction_sales1?sid=${datasid}&token=${data}&iuserid=${userId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify(updatedData)

            body: JSON.stringify(payTotalData)
          }).then((response) => response.json())
            .then((responseJson) => {

              // this.setState({
              //   isLoading:false
              // })


              //console.log(responseJson);
              if (responseJson.data) {
                this.setState({
                  salesID: responseJson.sales_id


                })
                Alert.alert(
                  "",
                  "Transaction Successful",
                  [
                    { text: 'Send Recipt(SMS)', onPress: () => this.smsButtonPress() },
                    { text: 'Send Recipt(Email)', onPress: () => this.emailButtonPress() },
                    { text: 'Done', onPress: () => this.reloadFlatList() },

                  ]
                )

              }
            })
            .catch((error) => {
              console.error(error);
              alert(error)
            });
        })
      })
    })



  }

  displayData = (number) => {


    // if(this.state.number == undefined){
    //   number = ""

    // }

    numberDisplayArr += number
    this.setState({ numberArr: numberDisplayArr })


  }

  displayData1 = () => {
    numberDisplayArr = numberDisplayArr.slice(0, -1)
    this.setState({ numberArr: numberDisplayArr })
  }

  deleteBtnPress = () => {


    this.state.ItemArray.splice(this.state.itemIndex, 1)

    subTotal = this.state.ItemArray.reduce(function (prev, current) {
      return prev + +current.totalPriceField
    }, 0);

    subTotal = (parseFloat(subTotal).toFixed(2))

    taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {

      taxPriceValue = (current.taxable === "Y" ? parseFloat(current.taxableField) * (current.qty) : 0)

      return prev + +(taxPriceValue).toFixed(2)
    }, 0);

    taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))
    this.setState({
      ItemArray: this.state.ItemArray,
      selectedRow: "",
      scanItemView: false,
      subTotal: subTotal,
      taxPriceLabel: taxPriceLabel
    })
  }


  homeScreen = () => {


    if (numberDisplayArr == "") {

      alert("Please Enter Amount ")
      return
    }
    this.setState({
      visible1: false,
      couponvalue: false,
      scanItemView: false
    });

    if (this.state.taxView == true) {

      this.state.barcode = 2
      this.state.SalesPriceData = parseFloat(numberDisplayArr).toFixed(2)
      this.ItemScanBtnTapped()
    }

    if (this.state.nonTaxView == true) {

      this.state.barcode = 3
      this.state.SalesPriceData = parseFloat(numberDisplayArr).toFixed(2)
      this.ItemScanBtnTapped()
    }

    if (this.state.couponvalue == true) {
      this.state.barcode = 18
      this.setState({
        taxView: false,
        nonTaxView: false
      })
      // this.state.test = true
      this.state.SalesPriceData = parseFloat(numberDisplayArr).toFixed(2)
      this.props.navigation.setParams({ couponvalue: false })
      this.ItemScanBtnTapped()

    }


    // {
    //   this.state.taxView == true &&
    //     this.setState({
    //       ItemArray: [...this.state.ItemArray, { itemBarcode: "2 @ $" + numberDisplayArr + ".00", totalPriceField: numberDisplayArr + ".00", qty: 1, itemName: "Taxable Item", taxable: "Y", priceValue: numberDisplayArr }]
    //     }, () => {



    //       subTotal = this.state.ItemArray.reduce(function (prev, current) {

    //         return prev + +(current.totalPriceField)

    //       }, 0);

    //       subTotal = (parseFloat(subTotal).toFixed(2))




    //       taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {

    //         taxPriceValue = (current.taxable === "Y" ? parseFloat(current.totalPriceField) : 0)

    //         return prev + +(taxPriceValue).toFixed(2) / 10
    //       }, 0);

    //       taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))

    //       this.setState({
    //         subTotal: (subTotal),
    //         taxPriceLabel: taxPriceLabel,
    //         subtotalView: true
    //       })

    //     })

    // }

    // if (this.state.nonTaxView == true) {

    //   this.setState({
    //     ItemArray: [...this.state.ItemArray, { itemBarcode: "3 @ $" + numberDisplayArr + ".00", totalPriceField: numberDisplayArr + ".00", qty: 1, itemName: "Non-Taxable Item", taxable: "N", priceValue: numberDisplayArr }]
    //   }, () => {
    //     subTotal = this.state.ItemArray.reduce(function (prev, current) {

    //       return prev + +(current.totalPriceField)

    //     }, 0);

    //     subTotal = (parseFloat(subTotal).toFixed(2))
    //     this.setState({
    //       subTotal: subTotal,
    //       subtotalView: false
    //     })
    //   })
    // }





  }
  qtyUpdate = () => {


    if (numberDisplayArr == "") {

      numberDisplayArr = "1"
      //return
    }
    if (numberDisplayArr[0] == "0") {
      numberDisplayArr = "1"

    }

    if (this.state.ItemArray.length == 0) {

      alert("Please Add items for update qty")

      return
    }




    this.state.ItemArray[this.state.itemIndex]['qty'] = numberDisplayArr
    this.state.ItemArray[this.state.itemIndex]['totalPriceField'] = this.state.ItemArray[this.state.itemIndex]['qty'] * this.state.ItemArray[this.state.itemIndex]['priceValue']

    this.state.ItemArray[this.state.itemIndex]['totalPriceField'] = (parseFloat(this.state.ItemArray[this.state.itemIndex]['totalPriceField']).toFixed(2))








    subTotal = this.state.ItemArray.reduce(function (prev, current) {
      return prev + +current.totalPriceField
    }, 0);

    subTotal = (parseFloat(subTotal).toFixed(2))


    taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {

      taxPriceValue = (current.taxable === "Y" ? parseFloat(current.taxableField) * (current.qty) : 0)

      return prev + +(taxPriceValue).toFixed(2)
    }, 0);

    taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))

    // taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {

    //   taxPriceValue = (current.taxable === "Y" ? parseFloat(current.totalPriceField) : 0)
    //   taxableFieldValue = (current.taxable === "Y" ? parseFloat(current.taxableField) * (numberDisplayArr) : 0)

    //   //taxPriceValue = (parseFloat(taxPriceValue).toFixed(2))

    //   return prev + +parseFloat(taxableFieldValue).toFixed(2) 
    // }, 0);
    // taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))


    this.setState({
      visible1: false,
    });
    {
      this.state.qtyUpdateView == true &&
        this.setState({
          ItemArray: this.state.ItemArray
        }, () => {
          console.log(this.state.ItemArray)
        })

    }
    // this.setState({
    //   visible1: false,
    //   selectedRow: "",

    // });

  }

  nextscreen = (item, index) => {

    this.setState({
      selectedRow: index,
      nonselectedRow: index,
      itemIndex: index,
      updateItem: item
    })

    this.setState({
      visible1: false,
    });

    this.setState({
      visible1: false,

    });




  }

  quickItemTapped = (item, index, section) => {

    console.log(item, index, section)

    this.state.barcode = item.vbarcode

    this.state.quickItemView = false
    this.ItemScanBtnTapped()

  }

  cancelBtnPress = () => {


    this.props.navigation.setParams({ holdVisibleView: false, hold: "" })

    this.setState({
      holdVisibleView: false,
      hold: "",
      cancel: true
    })


  }

  sendSmsButtonTapped = () => {




    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('SID').then((SID) => {
        AsyncStorage.getItem('salesID').then((salesID) => {


          // this.setState({
          //   isLoading:true
          // })
          const url = "https://devportal.albertapayments.com/api/" + 'admin/sms_process?sid='
          fetch(url + SID + "&token=" + data + "&mob_num=" + this.state.sendInputValue + "&sales_id=" + salesID)
            .then(response => response.json())
            .then(responseJson => {

              // this.setState({
              //   isLoading:false
              // })

              //Successful response from the API Call

              if (responseJson.success) {

                this.setState({
                  smsView: false,
                  // isLoading:false
                }, this.reloadFlatList())
                Alert.alert(responseJson.success)

              }

              if (responseJson.message) {
                Alert.alert(responseJson.message)
              }



            })
            .catch(error => {
              console.error(error);
            })
        })
      })
    })

    // this.setState({
    //   smsView:false
    // })
  }

  sendSmscancelPress = () => {


    this.setState({
      smsView: false
    })

  }

  itemDetailsClose = () => {

    this.setState({
      itemDetails: false

    })
  }


  holdBtnTapped = () => {




    if (this.state.ItemArray.length == 0) {
      Alert.alert("Please enter Item ")
      this.setState({
        holdInputValue: ""
      })
      return
    }
    else if (this.state.holdInputValue == "") {
      Alert.alert("Please enter Holder name")
      return
    }


    let { ItemArray: Items } = this.state



    Items = Items.map((item) => {

      // Alert.alert(JSON.stringify(item))



      return {



        SKU: item.barcode,
        qty: item.qty,
        // nordqty: item.qty_received,
        price: item.totalPriceField,
        tax: item.taxable,
        vitemname: item.itemName,

      }
    })



    let payTotalData = {
      "Totalitems": this.state.ItemArray.length,
      "SubTotal": this.state.subTotal,
      "tax_total": taxPriceLabel,
      "nnettotal": parseFloat(parseFloat(subTotal) + parseFloat(taxPriceLabel)).toFixed(2),
      "holdname": this.state.holdInputValue,
      "Items": Items
    }

    console.log(payTotalData)


    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("SID").then(datasid => {



        fetch("https://devportal.albertapayments.com/api/" + `admin/hold_transaction?sid=${datasid}&token=${data}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(updatedData)

          body: JSON.stringify(payTotalData)


        }).then((response) => response.json())

          .then((responseJson) => {


            if (responseJson.data) {
              Alert.alert(
                "",
                responseJson.data,
                [
                  { text: 'OK', onPress: () => this.reloadFlatList() },

                ]
              )

            }

            if (responseJson.error) {
              Alert.alert(
                "",
                responseJson.error,
                [
                  { text: 'OK', },

                ]
              )

            }



          })
          .catch((error) => {
            console.error(error);
            alert(error)
          });
      });
    })


  }



  renderItem = ({ item, index }) => {





    console.log(item)

    {


      return (

        <TouchableWithoutFeedback onPress={() => this.nextscreen(item, index)}>


          <View style={{ flex: 1, color: '#fff', backgroundColor: this.state.selectedRow === index ? 'blue' : "white", marginTop: 5, height: "50%", flexDirection: 'row', width: "100%", paddingLeft: 5 }}>

            <View style={{ width: '60%', color: 'white' }}>
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black' }}>{item.barcode + " @ " + item.priceValue}</Text>
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black' }}>{item.itemName}</Text>
            </View>

            <View style={{ width: '15%' }}>
              {/* <Text>{item.number}</Text> */}
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black' }}>{item.qty}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black' }}>{item.totalPriceField}</Text>
            </View>
            <View style={{ width: '5%' }}>
            </View>
            <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black' }}>{item.taxable}</Text>
          </View>
        </TouchableWithoutFeedback>
      )

    }


  }

  unholdItemSelect = (item, index) => {


    this.setState({
      selectedRow: index,
      nonselectedRow: index,
      itemIndex: index,
      updateItem: item,
      unholderName: item.vholdname,
      unHoldID: item.id



    })

    // this.selectUnholdName(item)


  }

  selectUnholdName = (item) => {




    AsyncStorage.getItem("token").then(token => {
      AsyncStorage.getItem("SID").then(SID => {




        fetch(ApiBaseUrl + `unhold_transaction?token=${token}&sid=${SID}&holdname=${this.state.unholderName}&hold_id=${this.state.unHoldID}`, {
          //  fetch(`https://devportal.albertapayments.com/api/admin/get_sku_user?sku=1&sid=1001&user_id=4&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU4MjYyODI1NCwiZXhwIjoxNTg1MjIwMjU0LCJuYmYiOjE1ODI2MjgyNTQsImp0aSI6IjRmNGNhMGMyYTJjYzQ5NDMzMGRmOWRiNjIzODQ4Y2I2In0.xoxoFWsI1zw3X3jMRlCgwcF2bIJj9eNn-wRHTpw0qqQ`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);

            //console.log(responseJson)

            // this.state.test["taxableField"] = "100"

            // this.setState({
            //   itemName: responseJson[0].itemName,
            //   SalesPriceData: responseJson[0].priceValue,
            //   itemBarcode: responseJson[0].barcode,
            //   taxValue1: responseJson[0].taxable,
            //   taxValue2: responseJson[0].taxable,
            //   taxValue3: responseJson[0].taxable,
            //   taxValue: "N",
            //   taxableField:parseInt("100"),
            //   // totalTax: 0,
            //   qty:this.state.qty
            // })

            this.state.ItemArray = responseJson


            // this.setState({
            //   ItemArray:responseJson
            // })

            console.log(this.state.ItemArray)




            this.unHoldList()

            // this.setState({
            //   ItemArray: [...this.state.ItemArray, { itemBarcode: this.state.itemBarcode + " @ $" + this.state.SalesPriceData, barcode: this.state.itemBarcode, totalPriceField: this.state.SalesPriceData, qty: 1, itemName: this.state.vitemname, taxable: this.state.taxValue, priceValue: this.state.SalesPriceData, taxableField: this.state.totalTax }]
            // }) 
            // () => {
            //   subTotal = this.state.ItemArray.reduce(function (prev, current) {
            //     console.log(current.totalPriceField)
            //     return prev + +current.totalPriceField
            //   }, 0);
            //   subTotal = (parseFloat(subTotal).toFixed(2))


            //   taxPriceLabel = this.state.ItemArray.reduce(function (prev, current) {
            //     taxPriceValue = parseFloat(current.taxableField * (current.qty))
            //     return prev + +(taxPriceValue).toFixed(2)
            //   }, 0);
            //   taxPriceLabel = (parseFloat(taxPriceLabel).toFixed(2))


            //   this.setState({
            //     subTotal: subTotal,
            //     taxPriceValue: taxPriceValue
            //   })
            // })


            // this.setState({
            //   ItemArray: responseJson[0],
            //   unholdVisibleView:false
            // })

            // console.log(this.state.ItemArray)

            this.props.navigation.setParams({ unholdVisibleView: false, unhold: "" })



          })
          .catch((error) => {
            console.error(error)
          }

          );
      })
    })





  }

  closebtnTapped = () => {
    this.props.navigation.setParams({ unholdVisibleView: false, unhold: "" })

  }






  holdItemList = ({ item, index }) => {

    // console.log(JSON.stringify(item))

    {


      return (

        <TouchableWithoutFeedback onPress={() => this.unholdItemSelect(item, index)}>


          <View style={{ flex: 1, color: '#fff', backgroundColor: this.state.selectedRow === index ? 'blue' : "white", marginTop: 1, marginBottom: 2, height: "50%", flexDirection: 'row', width: "100%", paddingLeft: 0 }}>

            <View style={{ width: '30%', color: 'white' }}>
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black', fontSize: 15 }}>{item.id}</Text>

            </View>

            <View style={{ width: '15%' }}>
              {/* <Text>{item.number}</Text> */}
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black', fontSize: 15 }}>{item.register}</Text>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black', fontSize: 15 }}>{item.date}</Text>
            </View>
            <View style={{ width: '5%' }}>
            </View>
            <Text style={{ color: this.state.selectedRow === index ? 'white' : 'black', fontSize: 15 }}>{item.vholdname}</Text>

          </View>

        </TouchableWithoutFeedback>
      )

    }

  }




  render() {



    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }


    if (this.state.ItemArray.length != 0) {
      this.state.hold = this.props.navigation.getParam('hold');
      this.state.holdVisibleView = this.props.navigation.getParam('holdVisibleView');

    }
    this.state.unhold = this.props.navigation.getParam('unhold');
    this.state.unholdVisibleView = this.props.navigation.getParam('unholdVisibleView');




    if (this.state.hold == "") {
      this.state.hold = this.props.navigation.getParam('hold');

      // this.state.holdVisibleView = this.props.navigation.getParam('holdVisibleView');
    }

    if (this.state.unhold == "") {
      this.state.unhold = this.props.navigation.getParam('unhold');
      // this.state.holdVisibleView = this.props.navigation.getParam('holdVisibleView');
    }


    if (this.state.hold == "hold" && this.state.ItemArray.length != 0) {

      this.state.hold = this.props.navigation.getParam('hold');
      this.state.holdVisibleView = this.props.navigation.getParam('holdVisibleView');
    }

    if (this.state.unhold == "unhold") {

      this.state.unhold = this.props.navigation.getParam('unhold');
      this.state.unholdVisibleView = this.props.navigation.getParam('unholdVisibleView');
    }
    this.state.pricecheck = this.props.navigation.getParam('pricecheck');
    if (this.state.pricecheck == true) {
      this.state.pricecheck = this.props.navigation.getParam('pricecheck');

    }
    this.state.couponvalue = this.props.navigation.getParam('couponvalue');
    if (this.state.couponvalue == true) {
      this.state.couponvalue = this.props.navigation.getParam('couponvalue');
      this.state.couponData = this.props.navigation.getParam('couponData');

      // this.state.numberDisplayArr = this.props.navigation.getParam('numberDisplayArr');


    }



    console.log(this.state.holdVisibleView);
    console.log(this.state.hold)

    if (this.state.ItemArray.length != 0) {

      this.state.void = this.props.navigation.getParam('void');

      if (this.state.void == "void") {

        Alert.alert(
          "",
          "Do you want to delete all Item",
          [
            {
              text: "Ok",
              onPress: () => this.voidButtnTapped(),

            },
            {
              text: "Canel",
              onPress: () => { }
            }
          ],
          {
            cancelable: false
          }
        )
      }


    }




    this.state.batchout = this.props.navigation.getParam('batchout');

    if (this.state.batchout == "batchout") {

      if (!this.alertPresent) {

        this.alertPresent = true;
        Alert.alert(
          "",
          "Do you want close the Shift",
          [
            {
              text: "Yes",
              onPress: () => this.batchOutButtonTapped(),

            },
            {
              text: "No",
              onPress: () => this.batchOutCancel(),
              // onPress: () => { }
            }
          ],
          {
            cancelable: false
          }
        )
      }
      else {

        this.alertPresent = false;
      }
    }





    const { height, width } = Dimensions.get('window')
    return (
      <View>

        <ScrollView style={{ backgroundColor: "#ccc", }}>

          <View
            style={{
              flex: 1,


              width: "100%",



            }}

          >

            <ImageBackground
              source={require("../Images/Dashboard.jpeg")}
              style={{ position: "relative", height: 260, paddingTop: 20 }}
            >

              < View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',

                  width: '100%',
                  marginTop: 30,
                  height: 30,
                }}>
                <TouchableOpacity style={{ backgroundColor: 'white', }} onPress={() => this.props.navigation.openDrawer()}>
                  <Ionicons name="menu" size={30} color="#f15a2c" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
                {/* <Text style={styles.storetext}>{this.state.sname}[{this.state.SID}]</Text> */}
                <View style={{ alignContent: 'center', alignItems: 'center', width: "100%", marginTop: 10, marginBottom: 40, height: 20 }}>
                  <Text style={styles.storetext}>{this.state.sname}[{this.state.SID}]</Text>
                  <Text style={styles.storeDate}>{this.state.todatDate}</Text>
                </View>



              </View>

              <Dialog height="70%" visible={this.state.unholdVisibleView}>

                <DialogContent>


                  <KeyboardAwareScrollView style={{ height: "13%", backgroundColor: '#fff' }}>
                    <ScrollView>

                      <View style={styles.consdsdtainer}>


                        <View style={{ flex: 1, height: "15%", backgroundColor: "#fff", marginTop: "2%", }}>
                          <View style={styles.unholdbtncontainerr}>
                            <TouchableOpacity style={styles.unholdbtncontainer} onPress={this.selectUnholdName}>
                              <Text style={styles.btnText}>Select</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.unholdbtncontainer} onPress={this.closebtnTapped}>
                              <Text style={styles.btnText}>close</Text>
                            </TouchableOpacity>
                          </View>



                        </View>





                        <View flexDirection="row" marginTop="0%" backgroundColor="#C0C0C0" marginBottom="2%">
                          <View
                            style={{
                              width: "25%",
                              backgroundColor: "#C0C0C0",
                              height: 26,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                fontWeight: "500",
                                // paddingLeft: 2,
                              }}
                            >
                              ID
    </Text>
                          </View>
                          <View
                            style={{
                              width: "25%",
                              backgroundColor: "#C0C0C0",
                              height: 26,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                fontWeight: "500",
                              }}
                            >
                              Register
    </Text>
                          </View>
                          <View
                            style={{
                              width: "25%",
                              backgroundColor: "#C0C0C0",
                              height: 26,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                fontWeight: "500",
                              }}
                            >
                              Date
    </Text>
                          </View>
                          <View
                            style={{
                              width: "25%",
                              backgroundColor: "#C0C0C0",
                              height: 26,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                fontWeight: "500",
                              }}
                            >
                              Hold Name
    </Text>
                          </View>
                        </View>
                        <FlatList
                          style={{


                            backgroundColor: "#696969",
                            height: "80%",



                          }}
                          // horizontal={true}
                          data={this.state.unholdListArray}
                          renderItem={this.holdItemList}
                          //extraData={this.props.selectedOptions}
                          extraData={this.state.refresh}
                        />

                      </View>

                    </ScrollView>
                  </KeyboardAwareScrollView>

                </DialogContent>

              </Dialog>





              <Dialog flex="1" height="30%" width="100%" dialogStyle={{ bottom: "18%" }} visible={this.state.smsView} onTouchOutside={() => {
                this.setState({ smsView: false, });
              }}>
                <ScrollView>
                  <DialogContent>
                    <View style={{ height: "60%", backgroundColor: "#fff", marginTop: "10%" }}>
                      {/* <Text onPress={() => { this.setState({ holdVisibleView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text> */}
                      <View style={styles.holdcontainer}>
                        <View style={{ width: '30%' }}>
                          <Text style={styles.smslabel}>Customer Number:</Text>
                        </View>
                        <View style={{ width: '70%', marginTop: 10 }}>
                          <TextInput
                            editable={true}
                            style={styles.smstextInput}
                            returnKeyType="done"
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            // onChangeText = {
                            //   this.setState({
                            //     holdInputValue:holdInputValue
                            //   })
                            // }
                            // value={this.state.qoh}
                            onChangeText={sendInputValue => this.setState({ sendInputValue })}
                          >
                          </TextInput>
                        </View>
                      </View>
                      <View style={styles.holdbtncontainerr}>
                        <TouchableOpacity style={styles.smsbtncontainer} onPress={this.sendSmsButtonTapped}>
                          <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smsbtncontainer} onPress={this.sendSmscancelPress} >
                          <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>



                    </View>
                  </DialogContent>
                </ScrollView>
              </Dialog>






              <Dialog flex="1" height="30%" width="100%" dialogStyle={{ bottom: "18%" }} visible={this.state.holdVisibleView} onTouchOutside={() => {
                this.setState({ holdVisibleView: false, });
              }}>
                <ScrollView>
                  <DialogContent>
                    <View style={{ height: "120%", backgroundColor: "#c39b77" }}>
                      {/* <Text onPress={() => { this.setState({ holdVisibleView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text> */}
                      <View style={styles.holdcontainer}>
                        <View style={{ width: '30%' }}>
                          <Text style={styles.holdlabel}>Hold Name:</Text>
                        </View>
                        <View style={{ width: '70%', marginTop: 10 }}>
                          <TextInput
                            editable={true}
                            style={styles.holdtextInput}
                            returnKeyType="next"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            // onChangeText = {
                            //   this.setState({
                            //     holdInputValue:holdInputValue
                            //   })
                            // }
                            // value={this.state.qoh}
                            onChangeText={holdInputValue => this.setState({ holdInputValue })}
                          >
                          </TextInput>
                        </View>
                      </View>
                      <View style={styles.holdbtncontainerr}>
                        <TouchableOpacity style={styles.holdbtncontainer} onPress={this.holdBtnTapped}>
                          <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.holdbtncontainer} onPress={this.cancelBtnPress} >
                          <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>



                    </View>
                  </DialogContent>
                </ScrollView>
              </Dialog>




              <Dialog height="40%" width="90%"
                visible={this.state.itemDetails}
                onTouchOutside={() => {
                  this.setState({ itemDetails: true, });
                }}
              >
                <ScrollView keyboardShouldPersistTaps='always'>
                  <View style={{ height: "100%", backgroundColor: "#fff" }}>
                    {/* <Text onPress={() => { this.setState({ holdVisibleView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text> */}
                    <View style={styles.holdcontainer}>
                      <View style={{ width: '100%' }}>
                        <Text style={{ color: '#f15a2c', fontSize: 20, fontWeight: "bold", marginLeft: "38%", marginTop: 10 }}>Item Details</Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Item Name: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}> {this.state.priceitemname} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Item Barcode: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}> {this.state.itemBarcode} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Category: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.itemCategory} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Department: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.itemDepartment} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Price: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.itemPrice} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Cost: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.itemCost} </Text></Text>
                        <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Quantity on Hand: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.itemQOH} </Text></Text>
                        {/* <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Warehouse Qty: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>
          <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" , marginTop:10 }}>Profit Margin: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{"Manish"} </Text></Text>         */}
                      </View>

                    </View>
                    <View style={styles.itemDetailscontainerr}>
                      <TouchableOpacity style={styles.itemDetailsContainer} onPress={this.itemDetailsClose}>
                        <Text style={styles.btnText}>OK</Text>
                      </TouchableOpacity>

                    </View>



                  </View>

                </ScrollView>
              </Dialog>


              <Dialog height="58%" width="90%"
                visible={this.state.pricecheck}
                onTouchOutside={() => {
                  this.setState({ pricecheck: true, });
                }}
              >
                <ScrollView keyboardShouldPersistTaps='always'>
                  <DialogContent>

                    <View style={{ flex: 1, }}>

                      <Text onPress={() => { this.props.navigation.setParams({ pricecheck: false }) }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>

                      <Text style={styles.scantext}>Item Details</Text>


                      <SearchableDropdown
                        // onTextChange={qoh => this.setState({ qoh })}

                        onTextChange={qoh => this.setState({ qoh })}

                        onItemSelect={(item) => {
                          this.state.barcode = item.vbarcode,
                            this.state.itemname = item.name,
                            //  resetValue = true,
                            this.priceCheckTapped()
                        }}


                        containerStyle={{ padding: 0 }}
                        //suggestion container style
                        textInputStyle={{
                          alignSelf: "stretch",
                          height: 40,
                          width: "90%",
                          // marginStart: 10,
                          borderColor: "#f15a2c",
                          borderWidth: 1,
                          // backgroundColor: '#636466',
                          marginBottom: 10,
                          color: '#fff',
                          fontSize: 15,
                          paddingHorizontal: 20,
                          borderRadius: 20,
                          shadowColor: "#fff",
                          marginLeft: 20,
                          padding: 20
                        }}
                        itemStyle={{
                          //single dropdown item style
                          padding: 10,
                          marginTop: 2,
                          backgroundColor: '#3386D6',
                          borderColor: '#bbb',
                          borderWidth: 1,
                        }}
                        itemTextStyle={{
                          //text style of a single dropdown item
                          color: 'white',
                        }}
                        itemsContainerStyle={{
                          //items container style you can pass maxHeight
                          //to restrict the items dropdown hieght
                          maxHeight: '70%',
                        }}
                        items={this.state.serverData}
                        //mapping of item array
                        defaultIndex={0}
                        //default selected item index
                        placeholder="Enter Item Name"
                        placeholderTextColor="#f15a2c"
                        //place holder for the search input
                        resetValue={true}
                        //reset textInput Value with true and false state
                        underlineColorAndroid="transparent"


                      //To remove the underline from the android input
                      />

                      {/* <TextInput style={styles.scaninput} placeholder="Enter Barcode" placeholderTextColor="#f15a2c" /> */}
                      <TextInput
                        ref={input => { this.barcode = input }}
                        style={styles.scaninput}
                        placeholder="Enter Barcode"
                        color='black'
                        placeholderTextColor="#f15a2c"
                        returnKeyType="done"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.barcode}
                        onChangeText={barcode => this.setState({ barcode })}
                        onSubmitEditing={() => this.priceCheckTapped()} />

                      <CardView

                        cardElevation={6}
                        cardMaxElevation={1}
                        cornerRadius={3}
                        style={{ margin: 10 }}>
                        <RNCamera
                          ref={ref => {
                            this.camera = ref;
                            // console.log(ref)
                          }}
                          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                          barcodeFinderWidth={"70%"}
                          barcodeFinderHeight={220}
                          barcodeFinderBorderColor="#f15a2c"
                          barcodeFinderBorderWidth={2}
                          defaultTouchToFocus
                          flashMode={this.state.camera.flashMode}
                          mirrorImage={false}
                          onBarCodeRead={this.onBarCodeRead.bind(this)}
                          onFocusChanged={() => { }}
                          onZoomChanged={() => { }}
                          permissionDialogTitle={'Permission to use camera'}
                          permissionDialogMessage={'We need your permission to use your camera phone'}
                          style={styles.scanpreview}
                          type={this.state.camera.type}>
                          <View style={styles.scanoverlay} />
                          <View style={[styles.scancontentRow, { height: 190, }]}>
                            <View style={styles.oscanverlay} />
                            <View style={[styles.scancontent, { width: 300, height: 190 }]} />
                            <View style={styles.scanoverlay} />
                          </View>
                          <View style={styles.scanoverlay} />

                        </RNCamera>
                      </CardView>

                    </View>
                  </DialogContent>

                </ScrollView>
              </Dialog>






              <View style={{ flexDirection: "row", marginTop: 15 }}>

                <TouchableOpacity
                  style={styles.btncontainer}
                  onPress={() => {
                    this.setState({ visible1: true, taxView: true, nonTaxView: false, qtyUpdateView: false, scanItemView: false, holdVisibleView: false });
                    this.taxableBtnPress()
                  }}

                >

                  <Dialog height="60%" width="90%"
                    visible={this.state.visible1}
                    onTouchOutside={() => {
                      this.setState({ visible1: true, });
                    }}
                  >
                    <ScrollView>
                      <DialogContent>
                        <View style={{ marginTop: "0%", flex: 1 }}>

                          <View style={{ marginTop: "3%", marginBottom: "1%" }}>
                            <Text onPress={() => { this.setState({ visible1: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>
                            {this.state.taxView == true && <Text style={styles.text}>Taxable Item</Text>}

                            {this.state.nonTaxView == true && <Text style={styles.text}>Non-Taxable Item</Text>}
                            {this.state.qtyUpdateView == true && <Text style={styles.text}>Qty Update</Text>}

                          </View>
                          {
                            this.state.qtyUpdateView == true &&
                            <TextInput style={styles.taxableinput} placeholder="1" placeholderTextColor="#f15a2c" textAlign='center' editable='false' value={numberDisplayArr} />
                          }
                          {
                            this.state.taxView == true &&
                            <TextInput style={styles.taxableinput} placeholder="$0,000.00" placeholderTextColor="#f15a2c" textAlign='center' editable='false' value={numberDisplayArr} />
                          }
                          {
                            this.state.nonTaxView == true &&
                            <TextInput style={styles.taxableinput} placeholder="$0,000.00" placeholderTextColor="#f15a2c" textAlign='center' editable='false' value={numberDisplayArr} />
                          }



                          <View style={{ flexDirection: "row", height: "15%" }}>

                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => this.displayData("1")}

                            >
                              <Text style={styles.taxablebtntext}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => this.displayData("2")}

                            >
                              <Text style={styles.taxablebtntext}>2</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("3")
                                // this.setState({ taxinputValue: "3" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>3</Text>
                            </TouchableOpacity>
                          </View>

                          <View style={{ flexDirection: "row", height: "15%" }}>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("4")
                                // this.setState({ taxinputValue: "4" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("5")
                                // this.setState({ taxinputValue: "5" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("6")
                                // this.setState({ taxinputValue: "6" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>6</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: "row", height: "15%" }}>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("7")
                                // this.setState({ taxinputValue: "7" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("8")
                                // this.setState({ taxinputValue: "8" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("9")
                                // this.setState({ taxinputValue: "9" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>9</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: "row", height: "15%" }}>


                            {
                              this.state.qtyUpdateView == true &&

                              <TouchableOpacity
                                style={styles.taxablebtncontainerblank}
                              // onPress={() => {
                              //   this.displayData(".")
                              //   // this.setState({ taxinputValue: "0" });
                              // }}
                              >
                                <Text style={styles.taxablebtntext}></Text>

                              </TouchableOpacity>
                            }
                            {
                              this.state.taxView == true &&
                              <TouchableOpacity
                                style={styles.taxablebtncontainer}
                                onPress={() => {
                                  this.displayData(".")
                                  // this.setState({ taxinputValue: "0" });
                                }}

                              >

                                <Text style={styles.taxabledottext}>.</Text>


                              </TouchableOpacity>
                            }
                            {
                              this.state.nonTaxView == true &&
                              <TouchableOpacity
                                style={styles.taxablebtncontainer}
                                onPress={() => {
                                  this.displayData(".")
                                  // this.setState({ taxinputValue: "0" });
                                }}

                              >

                                <Text style={styles.taxabledottext}>.</Text>


                              </TouchableOpacity>
                            }
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("0")
                                // this.setState({ taxinputValue: "0" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>0</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.taxablebtncontainer}

                              onPress={() => {
                                this.displayData1()
                                // this.setState({ taxinputValue: "0" });
                              }}
                            >
                              <Text style={styles.taxablebtntext}><Ionicons name="backspace-sharp" size={24} color="#f15a2c" /></Text>
                            </TouchableOpacity>

                          </View>
                          <View style={{ flex: 1, flexDirection: "column", height: "10%", marginBottom: '20%', }}>
                            {
                              this.state.taxView == true &&
                              <TouchableOpacity
                                style={styles.taxableitemBtnContainer}
                                onPress={this.homeScreen}
                              >
                                <Text style={styles.taxableitembtntext}>Add Item</Text>
                              </TouchableOpacity>
                            }

                            {
                              this.state.nonTaxView == true &&
                              <TouchableOpacity
                                style={styles.taxableitemBtnContainer}
                                onPress={this.homeScreen}
                              >
                                <Text style={styles.taxableitembtntext}>Add Item</Text>
                              </TouchableOpacity>
                            }
                            {
                              this.state.qtyUpdateView == true &&
                              <TouchableOpacity
                                style={styles.taxableitemBtnContainer}
                                onPress={this.qtyUpdate}
                              >
                                <Text style={styles.taxableitembtntext}>Update</Text>
                              </TouchableOpacity>
                            }



                          </View>
                        </View>


                      </DialogContent>
                    </ScrollView>
                  </Dialog>







                  <Dialog height="60%" width="90%"
                    visible={this.state.couponvalue}
                    onTouchOutside={() => {
                      this.setState({ couponvalue: true, });
                    }}
                  >
                    <ScrollView>
                      <DialogContent>
                        <View style={{ marginTop: "0%", flex: 1 }}>

                          <View style={{ marginTop: "3%", marginBottom: "1%" }}>
                            <Text onPress={() => this.props.navigation.setParams({ couponvalue: false, numberDisplayArr: "" })} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>
                            <Text style={styles.text}>Coupon</Text>
                          </View>

                          <TextInput style={styles.taxableinput} placeholder="$0,000.00" placeholderTextColor="#f15a2c" textAlign='center' editable='false' value={numberDisplayArr} />


                          <View style={{ flexDirection: "row", height: "15%" }}>

                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => this.displayData("1")}

                            >
                              <Text style={styles.taxablebtntext}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => this.displayData("2")}

                            >
                              <Text style={styles.taxablebtntext}>2</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("3")
                                // this.setState({ taxinputValue: "3" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>3</Text>
                            </TouchableOpacity>
                          </View>

                          <View style={{ flexDirection: "row", height: "15%" }}>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("4")
                                // this.setState({ taxinputValue: "4" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("5")
                                // this.setState({ taxinputValue: "5" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("6")
                                // this.setState({ taxinputValue: "6" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>6</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: "row", height: "15%" }}>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("7")
                                // this.setState({ taxinputValue: "7" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("8")
                                // this.setState({ taxinputValue: "8" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("9")
                                // this.setState({ taxinputValue: "9" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>9</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: "row", height: "15%" }}>



                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData(".")
                                // this.setState({ taxinputValue: "0" });
                              }}

                            >

                              <Text style={styles.taxabledottext}>.</Text>


                            </TouchableOpacity>


                            <TouchableOpacity
                              style={styles.taxablebtncontainer}
                              onPress={() => {
                                this.displayData("0")
                                // this.setState({ taxinputValue: "0" });
                              }}

                            >
                              <Text style={styles.taxablebtntext}>0</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.taxablebtncontainer}

                              onPress={() => {
                                this.displayData1()
                                // this.setState({ taxinputValue: "0" });
                              }}
                            >
                              <Text style={styles.taxablebtntext}><Ionicons name="backspace-sharp" size={24} color="#f15a2c" /></Text>
                            </TouchableOpacity>

                          </View>
                          <View style={{ flex: 1, flexDirection: "column", height: "10%", marginBottom: '20%', }}>

                            <TouchableOpacity
                              style={styles.taxableitemBtnContainer}
                              onPress={this.homeScreen}
                            >
                              <Text style={styles.taxableitembtntext}>Discount</Text>
                            </TouchableOpacity>


                          </View>
                        </View>


                      </DialogContent>
                    </ScrollView>
                  </Dialog>



                  <Text style={styles.btntext}>Taxable</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 50,
                    height: 90,
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    marginLeft: 12
                  }}
                  onPress={() => {
                    this.setState({ scanItemView: true, visible1: false, taxView: false, nonTaxView: false });

                  }}

                >

                  <Dialog height="58%" width="90%"
                    visible={this.state.scanItemView}
                    onTouchOutside={() => {
                      this.setState({ scanItemView: true, });
                    }}
                  >
                    <ScrollView keyboardShouldPersistTaps='always'>
                      <DialogContent>

                        <View style={{ flex: 1, }}>

                          <Text onPress={() => { this.setState({ scanItemView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>

                          <Text style={styles.scantext}>Scan New Item</Text>


                          <SearchableDropdown
                            // onTextChange={qoh => this.setState({ qoh })}

                            onTextChange={qoh => this.setState({ qoh })}

                            onItemSelect={(item) => {
                              this.state.barcode = item.vbarcode,
                                this.state.itemname = item.name,
                                //  resetValue = true,
                                this.ItemScanBtnTapped()
                            }}


                            containerStyle={{ padding: 0 }}
                            //suggestion container style
                            textInputStyle={{
                              alignSelf: "stretch",
                              height: 40,
                              width: "90%",
                              // marginStart: 10,
                              borderColor: "#f15a2c",
                              borderWidth: 1,
                              // backgroundColor: '#636466',
                              marginBottom: 10,
                              color: '#fff',
                              fontSize: 15,
                              paddingHorizontal: 20,
                              borderRadius: 20,
                              shadowColor: "#fff",
                              marginLeft: 20,
                              padding: 20
                            }}
                            itemStyle={{
                              //single dropdown item style
                              padding: 10,
                              marginTop: 2,
                              backgroundColor: '#3386D6',
                              borderColor: '#bbb',
                              borderWidth: 1,
                            }}
                            itemTextStyle={{
                              //text style of a single dropdown item
                              color: 'white',
                            }}
                            itemsContainerStyle={{
                              //items container style you can pass maxHeight
                              //to restrict the items dropdown hieght
                              maxHeight: '70%',
                            }}
                            items={this.state.serverData}
                            //mapping of item array
                            defaultIndex={0}
                            //default selected item index
                            placeholder="Enter Item Name"
                            placeholderTextColor="#f15a2c"
                            //place holder for the search input
                            resetValue={true}
                            //reset textInput Value with true and false state
                            underlineColorAndroid="transparent"


                          //To remove the underline from the android input
                          />

                          {/* <TextInput style={styles.scaninput} placeholder="Enter Barcode" placeholderTextColor="#f15a2c" /> */}
                          <TextInput
                            ref={input => { this.barcode = input }}
                            style={styles.scaninput}
                            placeholder="Enter Barcode"
                            color='black'
                            placeholderTextColor="#f15a2c"
                            returnKeyType="done"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.barcode}
                            onChangeText={barcode => this.setState({ barcode })}
                            onSubmitEditing={() => this.ItemScanBtnTapped()} />

                          <CardView

                            cardElevation={6}
                            cardMaxElevation={1}
                            cornerRadius={3}
                            style={{ margin: 10 }}>
                            <RNCamera
                              ref={ref => {
                                this.camera = ref;
                                // console.log(ref)
                              }}
                              barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                              barcodeFinderWidth={"70%"}
                              barcodeFinderHeight={220}
                              barcodeFinderBorderColor="#f15a2c"
                              barcodeFinderBorderWidth={2}
                              defaultTouchToFocus
                              flashMode={this.state.camera.flashMode}
                              mirrorImage={false}
                              onBarCodeRead={this.onBarCodeRead.bind(this)}
                              onFocusChanged={() => { }}
                              onZoomChanged={() => { }}
                              permissionDialogTitle={'Permission to use camera'}
                              permissionDialogMessage={'We need your permission to use your camera phone'}
                              style={styles.scanpreview}
                              type={this.state.camera.type}>
                              <View style={styles.scanoverlay} />
                              <View style={[styles.scancontentRow, { height: 190, }]}>
                                <View style={styles.oscanverlay} />
                                <View style={[styles.scancontent, { width: 300, height: 190 }]} />
                                <View style={styles.scanoverlay} />
                              </View>
                              <View style={styles.scanoverlay} />

                            </RNCamera>
                          </CardView>

                        </View>
                      </DialogContent>

                    </ScrollView>
                  </Dialog>





                  <Text style={styles.btntext1}><FontAwesome name="plus-circle" size={23} color="#f15a2c" />  Scan New Item</Text>




                </TouchableOpacity>
              </View>



              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 50,
                    height: 40,
                    marginLeft: 12,
                    // marginStart: "28%",
                    width: "28%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: -40,
                  }}
                  onPress={() => {

                    this.setState({ visible1: true, taxView: false, nonTaxView: true, qtyUpdateView: false, scanItemView: false });
                    this.taxableBtnPress()
                  }}
                // style={styles.btncontainer}
                //  onPress={this.Nextscreen}
                >
                  <Text style={styles.btntext}>Non-Taxable</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.btncontainer}
                  onPress={() => {
                    this.setState({ quickItemView: true, scanItemView: false });
                    //this.taxableBtnPress()
                  }}
                >
                  <Dialog height="85%" width="95%"
                    visible={this.state.quickItemView}
                    onTouchOutside={() => {
                      this.setState({ quickItemView: true, });
                    }}
                  >
                    <DialogContent>

                      <ScrollView>
                        <View>
                          <View style={{ marginTop: "3%", marginBottom: "1%" }}>
                            <Text onPress={() => { this.setState({ quickItemView: false, }); }} style={styles.taxableiconText}> <MaterialIcons name="cancel" size={26} color="#696969" /></Text>
                            <Text style={styles.scantext}>Quick Item</Text>

                          </View>
                          {/* <SafeAreaView style={styles.container}> */}
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              alignItems: "center",
                              marginLeft: 0,
                            }}
                          >
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="A"
                                onPress={() => {
                                  this.quickItemDataChange("a")
                                }} />
                            </View>
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="B"
                                onPress={() => {
                                  this.quickItemDataChange("b")
                                }} />
                            </View>
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="C" onPress={() => {
                                this.quickItemDataChange("c")
                              }} />
                            </View>
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="D" onPress={() => {
                                this.quickItemDataChange("d")
                              }} />
                            </View>
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="E" onPress={() => {
                                this.quickItemDataChange("e")
                              }} />
                            </View>
                            <View
                              style={styles.quickItemBtn}
                            >
                              <Button title="F"
                                onPress={() => {
                                  this.quickItemDataChange("f")
                                }} />
                            </View>
                          </View>
                          <ScrollView>
                            <View>

                              <SectionGrid

                                itemDimension={75}
                                // staticDimension={300}
                                // fixed
                                // spacing={20}
                                spacing={20}
                                sections={[
                                  {
                                    data: this.state.quickItemData.slice(0),
                                  },
                                ]}
                                style={styles.gridView}
                                renderItem={({ item, section, index }) => (

                                  <TouchableWithoutFeedback onPress={() => this.quickItemTapped(item, index, section)}>
                                    <View
                                      style={[styles.itemContainer, { backgroundColor: "#fff" }]}
                                    >
                                      <Text style={styles.itemName}>{item.vitemname}</Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                )}
                                renderSectionHeader={({ section }) => (
                                  <Text style={styles.sectionHeader}>{section.title}</Text>

                                )}
                              />
                              {/* <TouchableOpacity
                                style={styles.taxableitemBtnContainer}
                                onPress={this.qtyUpdate}
                              >
                                <Text style={styles.taxableitembtntext}>Add Items</Text>
                              </TouchableOpacity> */}

                            </View>
                          </ScrollView>


                          {/* </SafeAreaView> */}
                        </View>
                      </ScrollView>
                    </DialogContent>

                  </Dialog>
                  <Text style={styles.btntext}>Quick Item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btncontainer}
                  onPress={() => {
                    {
                      this.state.ItemArray.length > 0 && this.state.selectedRow == this.state.itemIndex ?

                        this.setState({
                          visible1: true,
                          qtyUpdateView: true,
                          scanItemView: false
                        })
                        :
                        null
                      // alert("Please Add item for update qty")
                    }
                    this.setState({ taxView: false, nonTaxView: false, });
                    this.taxableBtnPress()
                  }}
                >

                  <Text style={styles.btntext}>Qty Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btncontainer}
                  onPress={() => {
                    {
                      this.state.ItemArray.length > 0 && this.state.selectedRow == this.state.itemIndex ?
                        Alert.alert(
                          "",
                          "Do you want to delete the Item",
                          [
                            {
                              text: "Ok",
                              onPress: () => this.deleteBtnPress(),

                            },
                            {
                              text: "Canel",
                              onPress: () => { }
                            }
                          ],
                          {
                            cancelable: false
                          }
                        )
                        : null

                    }

                  }}

                >
                  <Text style={styles.btntext}>Delete</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>


          <View style={styles.container}>

            <View flexDirection="row" marginTop="0%">
              <View
                style={{
                  width: "60%",
                  backgroundColor: "#fff",
                  height: 26,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ccc",
                    fontWeight: "bold",
                    paddingLeft: 2,
                  }}
                >
                  Name
                </Text>
              </View>
              <View
                style={{
                  width: "16%",
                  backgroundColor: "#fff",
                  height: 26,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ccc",
                    fontWeight: "bold",
                  }}
                >
                  Qty
                </Text>
              </View>
              <View
                style={{
                  width: "16%",
                  backgroundColor: "#fff",
                  height: 26,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ccc",
                    fontWeight: "bold",
                  }}
                >
                  Price
                </Text>
              </View>
              <View
                style={{
                  width: "18%",
                  backgroundColor: "#fff",
                  height: 26,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ccc",
                    fontWeight: "bold",
                  }}
                >
                  Tax
                </Text>
              </View>
            </View>
            <FlatList
              style={{
                backgroundColor: "#ccc",
                height: 450,


              }}
              // horizontal={true}
              data={this.state.ItemArray}
              renderItem={this.renderItem}
              //extraData={this.props.selectedOptions}
              extraData={this.state.refresh}
            />
            <View style={{ marginTop: "2%" }}></View>
            <View style={{ flexDirection: "row", }}></View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 5

              }}
            >
              <Text style={{ fontSize: 17 }}>Total Items:</Text>
              <Text style={{ paddingRight: 7, fontSize: 17 }}>{this.state.ItemArray.length}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 5,

              }}
            >
              <Text style={{ fontSize: 17 }}>Sub Total:</Text>
              {
                this.state.ItemArray.length == 0 ? <Text style={{ paddingRight: 7, fontSize: 17 }}>$0.00</Text> : <Text style={{ paddingRight: 7, fontSize: 16 }}>${subTotal}</Text>
              }

            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 5

              }}
            >
              <Text style={{ fontSize: 17 }}>Tax:</Text>{
                this.state.ItemArray.length == 0 ? <Text style={{ paddingRight: 7, fontSize: 17 }}>$0.00</Text> : <Text style={{ paddingRight: 7, fontSize: 16 }}>${taxPriceLabel}</Text>
              }

            </View>

          </View>
          <View style={{ flex: 1, }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#f16a2c",
                borderRadius: 50,
                height: 50,
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 13,
                marginLeft: "15%",
                marginBottom: 13
              }}
              // renderItem={({ item, section, index }) => (

              //   <TouchableWithoutFeedback onPress={() => this.payButtonPress(item, index, section)}>
              //   </TouchableWithoutFeedback>
              // )}
              onPress={() => this.payButtonPress()}
            >

              {/* <Text style={{ color: "#fff", fontSize: 20 , fontWeight:"bold" }}>PAY $0,000.00</Text> */}
              {this.state.ItemArray.length == 0 ? <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>PAY $0,000.00</Text> : <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>PAY ${parseFloat(parseFloat(subTotal) + parseFloat(taxPriceLabel)).toFixed(2)}</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 40,
    // marginHorizontal:"1%",
    // marginStart: "28%",
    width: "28%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 12,
    //padding: 5,
  },
  flatListText: {
    color: "white"
  },
  btntext: {
    //textAlign : 'center',
    fontSize: 14,
    alignItems: "center",
    color: "#f15a2c",
  },

  btntext1: {
    //textAlign : 'center',
    fontSize: 17,
    alignItems: "center",
    color: "#f15a2c",
  },

  storetext: {

    // left:"30%",
    // top:-30,
    // flex:1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    // marginLeft:"20%",
    // alignSelf:'center',
    // justifyContent:'center'
    // width:"90%"

    //  position:'relative'
  },
  storeDate: {
    marginTop: 0,
    // left:"30%",
    // top:-30,

    fontSize: 16,
    color: '#fff',
    fontWeight: '600',

    //  position:'relative'
  },

  taxablecontainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    //marginLeft: 20,
    fontSize: 18,
    // marginTop: 20,
    marginStart: 10,
    color: "#696969",
    fontWeight: "600",
    marginBottom: 10,
  },
  taxablebtncontainer: {
    backgroundColor: "#fff",
    borderRadius: 1000,
    width: "17%",
    height: "54%",
    margin: "7%",
    backgroundColor: '#fff',
    shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },

    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 0,
  },
  taxablebtncontainerblank: {
    // backgroundColor: "#fff",
    // borderRadius: 1000,
    width: "17%",
    height: "54%",
    margin: "7%",
    // backgroundColor: '#fff',
    shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",


  },
  taxableitemBtnContainer: {
    backgroundColor: "#f17a2c",
    borderRadius: 50,
    height: 40,
    marginLeft: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // marginBottom: 30
  },
  taxableitembtntext: {
    //textAlign : 'center',
    fontSize: 17,
    alignItems: "center",
    color: "#fff",
  },
  taxablebtntext: {
    //textAlign : 'center',
    fontSize: 17,
    alignItems: "center",
    color: "#f15a2c",
  },
  taxabledottext: {
    //textAlign : 'center',
    fontSize: 17,
    fontWeight: "900",
    alignItems: "center",
    color: "#f15a2c",
  },
  taxablelabelText: {
    //marginLeft: 20,
    fontSize: 18,
    // marginTop: 20,
    marginStart: 10,
    color: "#696969",
    fontWeight: "600",
    marginBottom: 20,
  },
  taxableiconText: {
    fontSize: 25,
    // marginTop: 20,
    //  marginTop:10,
    marginLeft: "90%",
    color: "red",
    fontWeight: "bold",
    // marginBottom: -20,
  },
  taxableinput: {

    fontSize: 20,
    marginLeft: 20,
    height: 40,
    width: "90%",
    borderColor: "#f15a2c",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#fff",
    padding: 10,
    color: '#f15a2c',

  },
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
    marginTop: 10

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
    // width: this.maskLength,
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
    borderColor: '#f15a2c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quickItemcontainer: {
    flex: 1,
    // width: 400,
    marginTop: 40,
  },
  quickItemBtn: {
    backgroundColor: "white",
    flex: 1,
    color: "black",
    width: "7%",
    // margin: "1%",
    marginHorizontal: "3%",
    marginVertical: '-1%',
    shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    }

  },
  gridView: {
    marginTop: 20,
    backgroundColor: "#f7f7f7",
    shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 75,
  },
  holdbtncontainerr: {

    marginLeft: 50,
    flexDirection: 'row',
  },
  itemDetailscontainerr: {

    marginLeft: "30%",
    flexDirection: 'row',
    marginTop: 20,
    width: "60%"
  },
  holdbtncontainer: {
    flex: 1,
    backgroundColor: '#3386D6',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: "45%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 20
  },

  itemDetailsContainer: {
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
  smsbtncontainer: {
    flex: 1,
    backgroundColor: '#f17a2c',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: "45%",
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

  holdView: {
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
  },
  holdlabel: {
    fontSize: 18,
    fontWeight: '500',
    color: "black",
    marginTop: 10
  },
  smslabel: {
    fontSize: 18,
    fontWeight: '600',
    color: "#f17a2c",
    marginTop: 10
  },
  holdtextInput: {
    //  flex: 1,
    // marginTop:60,
    backgroundColor: "#fff",
    fontSize: 20,
    marginLeft: 20,
    height: 40,
    width: "90%",
    // borderColor: "#f15a2c",
    borderWidth: 1,
    marginBottom: 15,
    // borderRadius: 20,
    shadowColor: "#fff",
    padding: 10,

  },

  smstextInput: {
    //  flex: 1,
    // marginTop:60,
    backgroundColor: "#fff",
    fontSize: 20,
    marginLeft: 20,
    height: 40,
    width: "90%",
    borderColor: "#f15a2c",
    borderWidth: 1,
    marginBottom: 15,
    // borderRadius: 20,
    shadowColor: "#fff",
    padding: 10,

  },
  unholdbtncontainerr: {

    marginLeft: 50,
    flexDirection: 'row',
    marginTop: 20,
    // marginBottom:20

  },
  unholdbtncontainer: {
    flex: 1,
    backgroundColor: '#3386D6',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: "45%",
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





});

