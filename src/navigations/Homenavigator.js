import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"; 
import Home from '../screens/Homescreen';
export default function Homenavigator() {
    const HomeStackNavigator = createStackNavigator()
    return (
        <HomeStackNavigator.Navigator headerMode='none'>
            <HomeStackNavigator.Screen component={Home} name='todos'/>
        </HomeStackNavigator.Navigator>
    )
}
