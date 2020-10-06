import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from './src/Login/SplashScreen'
import Login from './src/Login/Login'
import ScanItem from './src/Login/ScanItem'




const NavigationStack = createStackNavigator({
    SplashScreen: { 
        screen: SplashScreen,
    },
    Login: { 
        screen: Login,
    },
    ScanItem:{
        screen: ScanItem,

    }
});

const Container = createAppContainer(NavigationStack);

export default Container; 