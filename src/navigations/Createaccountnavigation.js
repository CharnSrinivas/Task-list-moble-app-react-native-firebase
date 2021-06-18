import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
const CreactaccountStackNavigator = createStackNavigator();
import Createaccount from "../screens/Createaccountscreen";

const CreateAccountNavigator = () => {
  return (
    <CreactaccountStackNavigator.Navigator headerMode='none'>
      <CreactaccountStackNavigator.Screen component={Createaccount} name="createaccount" />
    </CreactaccountStackNavigator.Navigator>
  );
};

export default CreateAccountNavigator;
//126970215
