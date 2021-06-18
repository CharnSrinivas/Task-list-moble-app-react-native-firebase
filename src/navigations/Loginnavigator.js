import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
const LoginStackNavigaor = createStackNavigator();
import Login from "../screens/Loginscreen";

const LoginNavigator = () => {
  return (
    <LoginStackNavigaor.Navigator headerMode='none'>
      <LoginStackNavigaor.Screen component={Login} name="login" />
    </LoginStackNavigaor.Navigator>
  );
};

export default LoginNavigator;
//126970215
