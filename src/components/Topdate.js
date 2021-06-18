import React from "react";
import { View, Text, StyleSheet } from "react-native";
import XDate from "xdate";

const dateSize = 35;
const montSize = 38;
const weekDaySize = 18;
const yearSize = 50;

const fontShadow={
    // textShadowColor: 'rgba(0,0,0,0.2)', 
    // textShadowRadius:1,
    // textShadowOffset:{width:1,height:0.5}
    elevation:10
}

export default function Topdate({ selectedDate }) {
  let date = selectedDate.getDate();
  let month = selectedDate.toDateString().split(" ")[1];
  let year = selectedDate.getFullYear();
  let weekday =
    XDate.locales[XDate.defaultLocale].dayNamesShort[selectedDate.getDay()];
  return (
    <View style={styles.main}>
      <View style={styles.left_section}>
        <View style={styles.date_month}>
          <Text style={[styles.date,fontShadow]}>{date}</Text>
          <Text style={[styles.month,fontShadow]}> {month}</Text>
        </View>
        <Text style={[styles.weekday,fontShadow]}> {weekday}</Text>
      </View>
      <View style={styles.right_section}>
        <Text style={[styles.year,fontShadow]}>{year}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 15,marginBottom:30,
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal:10
  },
  left_section: {
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "50%",
    // backgroundColor: "gray",
  },
  date_month: {
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "flex-start",

  },
  month: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: montSize,


  },

  date: {
    alignSelf: "center",
    fontSize: dateSize,
    fontWeight: "500",elevation:10,
  },
  weekday: {
    fontSize: weekDaySize,
  },
  right_section: {
    height: "100%",
    width:'50%',
    // backgroundColor: "green",
    flexDirection:'row',
    justifyContent: "flex-end",
    alignItems:'center'
  },
  year: {
    // alignSelf: "center",
    fontSize: yearSize,
    fontWeight: "600",
  },
});
