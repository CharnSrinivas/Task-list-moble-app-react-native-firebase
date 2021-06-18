import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableNativeFeedback } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { dateColors, completeActionColor, completeActionIconColor, completedTaskColor,deleteActionColor, dleteActionIconColor } from "../constants/lightColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getPercentageofWidth, getPerctageofHeight } from "../constants/Dimensions";



const taskHeight = 80
var dateColor = null
const leftAtionThreshold = getPercentageofWidth(18)
const rightAtionThreshold = getPercentageofWidth(18)
const iconSize = 30



const getColor = (index) => {

  let len = dateColors.length - 1
  if (index > len) {
    return getColor(index - len)
  }
  return dateColors[index]
};


const Task = ({ day, task, index,removeTask,markCompleted }) => {
  dateColor = getColor(index)
  
  const [isDeleted, setIsDeleted] = useState(false)
  const [isCompleted, setIsCompletd] = useState(false)
  const leftAction = () => {

    // const scale = dragX.interpolate(
    //   {
    //     inputRange: [0, 100],
    //     outputRange: [0, 1],
    //     extrapolate: 'clamp'
    //   })
    return (
      <View style={styles.left_action}>
        <TouchableOpacity onPress={() => { setIsCompletd(!isCompleted) ;markCompleted(task.id,day.dateString,task.title,task.time)}}>
          {!isCompleted && <MaterialCommunityIcons name='check-bold' size={iconSize} color={completeActionIconColor} />}
          {isCompleted && <MaterialCommunityIcons name='check-all' size={iconSize} color={completeActionIconColor} />}
        </TouchableOpacity>
      </View>

    )
  }

  const rightAction = () => {
    
    return (

      <View style={styles.right_action} >
        <TouchableOpacity onPress={() => { setIsDeleted(!isDeleted) ;removeTask(task.id,day.dateString)}}>
          {!isDeleted && <MaterialCommunityIcons name='delete-outline' size={iconSize} color={dleteActionIconColor} />}
          {isDeleted && <MaterialCommunityIcons name='delete-empty-outline' size={iconSize} color={dleteActionIconColor} />}
        </TouchableOpacity>
      </View>

    )
  }


  // let weekday = new Date(day.dateString).toDateString().split(' ')[0]
  return (
    <View>
   {!task.isCompleted && <Swipeable
      renderLeftActions={leftAction}
      leftThreshold={leftAtionThreshold}
      renderRightActions={rightAction}
      rightAtionThreshold={rightAtionThreshold}
      
      avgTouches
    >
      <View style={styles.task}>
        <View style={[{ backgroundColor: dateColor }, styles.date]}>
          {/* <Text
          style={[{fontSize: 12,},styles.date_text]}>
          {weekday}
        </Text> */}
          {task.time!=undefined && <Text style={[{ fontSize: 14, }, styles.date_text]}>
            {task.time.split(' ')[0]}
          </Text>}
          {task.time!=undefined && <Text style={[{ fontSize: 12, }, styles.date_text]} >
          {task.time.split(' ')[1]}
          </Text>}
        </View>
        <View style={styles.task_content}>
          <Text style={styles.task_title}>{task.title}</Text>
        </View>
      </View>
    </Swipeable>}

    


 {task.isCompleted && <Swipeable
      renderLeftActions={leftAction}
      leftThreshold={leftAtionThreshold}
      renderRightActions={rightAction}
      rightAtionThreshold={rightAtionThreshold}
      
      avgTouches
    >
      <View style={styles.completed_task}>
        <View style={[{ backgroundColor: dateColor }, styles.date]}>
          {/* <Text
          style={[{fontSize: 12,},styles.date_text]}>
          {weekday}
        </Text> */}
          {task.time!=undefined && <Text style={[{ fontSize: 14, }, styles.date_text]}>
            {task.time.split(' ')[0]}
          </Text>}
          {task.time!=undefined && <Text style={[{ fontSize: 12, }, styles.date_text]} >
          {task.time.split(' ')[1]}
          </Text>}
        </View>
        <View style={styles.task_content}>
          <Text style={styles.task_title}>{task.title}</Text>
        </View>
      </View>
    </Swipeable>}


    </View>
  );
      
};


const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 15,
    height: taskHeight,
    marginTop: 20,
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "#ffff",
    elevation: 3
  },
  completed_task:{
    flexDirection: "row",
    width: "90%",
    borderRadius: 15,
    height: taskHeight,
    marginTop: 20,
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: completedTaskColor,
    elevation: 3
  },
  task_content: {
    marginLeft: "5%",
    
    alignSelf: "center",
  },
  task_title: {
     fontSize: 15, color: '#333'
    },
  date: {
    height: "100%",
    width: "13%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    padding: 1
  },
  date_text: {
    color: "#ececec",
    margin: 10,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },
  left_action: {
    backgroundColor: completeActionColor,
    flexDirection: "row",
    margin: '5%',
    width: leftAtionThreshold,
    borderRadius: 15,
    height: taskHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 0,
  },

  right_action: {
    backgroundColor: deleteActionColor,
    flexDirection: "row",
    marginRight: '5%',
    borderRadius: 15,
    width: rightAtionThreshold,
    height: taskHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    // marginLeft:0,
    justifyContent: 'center',
  }, left_action_icon: {

  }

});

export default Task;
