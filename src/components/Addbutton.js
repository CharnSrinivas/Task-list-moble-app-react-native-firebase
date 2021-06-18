import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { buttonBackgroundColor, buttonIconColor } from "../constants/lightColors";
import { getPercentageofWidth, getPercentageoHeight } from "../constants/Dimensions";
import Animated from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import Prompt from 'react-native-input-prompt/src/Prompt'


const buttonSize = Math.round(
  (getPercentageoHeight(10) + getPercentageofWidth(10)) / 2
);
const addTodoPromptTitle = 'Add new task'



const Addbutton = ({addTask}) => {

  const [addTodo, setAddTodo] = useState(false)
  const [showInputPromt, setShowInputPrompt] = useState(false)
  const [newTaskTitle,setNewTaskTitle] = useState('')

  return (
    <View>
      <Prompt
        visible={showInputPromt}
        title={addTodoPromptTitle}
        placeholder={'Task title here'}
        submitText={'add to list'}
        onCancel={() => { setShowInputPrompt(!showInputPromt) }}
        onChangeText={(text)=>setNewTaskTitle(text)}
        onSubmit={()=>
          {
            addTask(newTaskTitle)
            setShowInputPrompt(false)
          }
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => {
        setShowInputPrompt(!showInputPromt)
      }
      }>

        <Animated.View >
          <Feather name="plus" size={buttonSize} style={styles.icon} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: buttonBackgroundColor,
    width: buttonSize,
    height: buttonSize,
    borderRadius: 100,
    right: buttonSize / 2,
    bottom: buttonSize / 2,
    //NOTE  : this makes button to flot on top dont forgot it !
    position: 'absolute', elevation: 3
  },
  icon: {
    width: '100%',
    height: '100%',
    fontWeight: '100',
    color: buttonIconColor,
    textAlign: 'center', textAlignVertical: 'center',
  },
});
export default Addbutton;
