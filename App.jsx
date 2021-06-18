import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Loginnavigator from "./src/navigations/Loginnavigator";
import Homenavigator from "./src/navigations/Homenavigator";
import CreateAccountNavigator from "./src/navigations/Createaccountnavigation";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const RootStackNavigator = createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
    
      <NavigationContainer>
        <RootStackNavigator.Navigator headerMode='none'>
        <RootStackNavigator.Screen name='authlogin' component={Loginnavigator}  />
        <RootStackNavigator.Screen name='authcreateaccount' component={CreateAccountNavigator}  />
        <RootStackNavigator.Screen name='home' component={Homenavigator} />
        </RootStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}


