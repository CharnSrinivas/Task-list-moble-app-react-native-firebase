import React, { Component } from "react";
import Tasks from "../components/Tasks";
import { StyleSheet, View, Text } from "react-native";

export var userName = 'charan'

export const setUserName =(name)=>{
  userName=name
}

export default class Home extends Component {

  render() {
    console.log(new Date().toISOString())
    return (
      <View style={styles.home}>
        <Tasks />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    width: "100%",
    height: "100%",

  },
});
