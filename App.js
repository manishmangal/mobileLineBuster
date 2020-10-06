

import React from 'react';
// import { View, Text , Image , Button } from 'react-native';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button, AsyncStorage ,SafeAreaView } from 'react-native'
import {
  createAppContainer, createSwitchNavigator,NavigationActions
  
} from 'react-navigation';
import { createDrawerNavigator, DrawerSidebar, DrawerRouter ,DrawerItems   } from 'react-navigation-drawer';
import { createStackNavigator  } from 'react-navigation-stack';
import SplashScreen from './src/Login/SplashScreen'
import Login from './src/Login/Login'
import Logo from './src/home/Logo';
import ScanItem from './src/Item/ScanItem'
import Dashboard from './src/home/Dashboard'
import Hold from './src/home/Hold'
import Unhold from './src/home/Unhold'


import Coupon from './src/home/Coupon'
import Recipt from './src/home/Recipt'
import PriceCheck from './src/home/PriceCheck'
import Setting from './src/home/Setting'
import BatchIn from './src/home/BatchIn'
import BatchOut from './src/home/BatchOut'

import Void from './src/home/Void'
import Taxable from './src/home/Taxable'

import CustomComponent from './src/home/CustomComponent'
export default class App extends React.Component {

  render() {
    
    return <AppContainer />;
   
  }

}

// const DefaultDrawer = (props) => (
//   <ScrollView>
//     <SafeAreaView style={styles.container}>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );



const DashboardDrawer = createDrawerNavigator(
  {

  
  

Dashboard: {
  
  screen: Dashboard,
  navigationOptions: {
    drawerLabel: 'Dashboard',  

    drawerContentOptions:{
      activeTintColor: '#e91e63',
     
    },
  },
},


Hold: {
  screen: Hold,
  navigationOptions: {
    drawerLabel: 'Hold',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  },

},


Unhold: {
  screen: Unhold,
  navigationOptions: {
    drawerLabel: 'Unhold',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

Void: {
  screen: Void,
  navigationOptions: {
    drawerLabel: 'Void', 
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  },
},


Coupon: {
  screen: Coupon,
  navigationOptions: {
    drawerLabel: 'Coupon',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

Recipt: {
  screen: Recipt,
  navigationOptions: {
    drawerLabel: 'Recipt',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

PriceCheck: {
  screen: PriceCheck,
  navigationOptions: {
    drawerLabel: 'PriceCheck',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

Setting: {
  screen: Setting,
  navigationOptions: {
    drawerLabel: 'Setting',
    drawerStyle: {
      backgroundColor: 'red', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

BatchIn: {
  screen: BatchIn,
  navigationOptions: {
    drawerLabel: 'Batch In',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

BatchOut: {
  screen: BatchOut,
  navigationOptions: {
    drawerLabel: 'Batch Out',
    headerStyle: {
      backgroundColor: '#f4511e', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
  }, 
},

// Login: {
//   screen: Login,
//   navigationOptions: {
//     drawerLabel: 'Log out',
//     headerStyle: {
//       backgroundColor: 'red', //Set Header color
//     },
//     headerTintColor: '#fff', //Set Header text color
//     headerTitleStyle: {
//       fontWeight: 'bold', //Set Header text style
//     },
//   }, 
// },
 
},
{
  drawerWidth:"50%",
  initialRouteName: 'Dashboard',
   contentComponent: CustomComponent,
  contentOptions: {
    activeTintColor: '#000000',
    activeBackgroundColor: '#e6e6e6',
  }
}



)





const AppNavigator =  createStackNavigator({

 

    // SplashScreen: {
      
    //   screen: SplashScreen,
    //   navigationOptions: {
        
    //     headerLeft: null,

    //     headerTitle: () => <Logo />,
        
    //     headerStyle: {
    //       backgroundColor: '#fff',
    //     },
    //     headerTintColor: '#606070',
    //   },

    // },  




  Login: {
    screen: Login,
    //headerBackTitle: 'some label',
    Header: null,
    navigationOptions: {
      headerShown: false,
      // headerBackTitle: "Back",
      // headerBackTitleStyle :{
      //      color:'blue'
      // },
      // headerLeft: ()=> true,
      // headerTitle: ()=>  <Logo/>,
      // headerStyle: {
      //   headerLeft: true,
      //   backgroundColor: '#fff',
      // },
      // headerTintColor: '#606070',
      headerTitle: null,

    }


  },

  
  Dashboard: {
    screen: DashboardDrawer,
    navigationOptions: {
      headerLeft: () => {},
      // headerTitle: ()=>  <Logo/>,
      // headerStyle: {
      //   backgroundColor: 'red',
      // },
      // headerTintColor: '#606070',
      headerShown: false,
      headerTitle: null
    },
    
    

  },
  ScanItem: {
    screen: ScanItem,
    //headerBackTitle: 'some label',

    navigationOptions: {
      // headerBackTitle: "Back",
      // headerBackTitleStyle :{
      //      color: 'Blue'
      // },
      // headerLeft: ()=> true,
      headerTitle: () => <Logo />,
      headerStyle: {
        headerLeft: true,
        backgroundColor: '#fff',
      },
      headerTintColor: '#606070',
    }


  },
  Taxable: {
    screen: Taxable,
    //headerBackTitle: 'some label',

    navigationOptions: {
      // headerBackTitle: "Back",
      // headerBackTitleStyle :{
      //      color: 'Blue'
      // },
      // headerLeft: ()=> true,
      headerTitle: () => <Logo />,
      headerStyle: {
        headerLeft: true,
        backgroundColor: '#fff',
      },
      headerTintColor: '#606070',
    }


  },
  // Hold: {
  //   screen: Hold,
  //   navigationOptions: {
  //     headerLeft: () => {},
  //     // headerTitle: ()=>  <Logo/>,
  //     // headerStyle: {
  //     //   backgroundColor: '#fff',
  //     // },
  //     // headerTintColor: '#606070',
  //     headerShown: false,
  //     headerTitle: null
  //   }

  // },

  // Unhold: {
  //   screen: Unhold,
  //   navigationOptions: {
  //     headerLeft: () => {},
  //     // headerTitle: ()=>  <Logo/>,
  //     // headerStyle: {
  //     //   backgroundColor: '#fff',
  //     // },
  //     // headerTintColor: '#606070',
  //     headerShown: false,
  //     headerTitle: null
  //   }

  // },

  
});

const AppContainer = createAppContainer(AppNavigator);






