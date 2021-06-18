import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Task from "./Task";
import Calender from "./Calender";
import Addbutton from "./Addbutton";
import Loading from "./Loading";
import { getCurrentTime } from "../utils";
import Topdate from "./Topdate";
import db, { firebase } from "../config/firebase";
import uuid from 'react-native-uuid'
import { userName } from "../screens/Homescreen";



class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      isCalenderOpened: false, shouldUpdate: false,
      selectedDayTasks: [],
      tasks: {},isLoading:true,

    };

    this.setTasksArray(this.state.selectedDate.toISOString().split('T')[0])

  }

  onDaypressed = (day) => {
    this.setState({
      selectedDate: new Date(day.dateString),
    });
  };
  calenderToggeled = (isOpened) => {

    this.setState({
      isCalenderOpened: isOpened,
    });
  };
  renderEmptyDate() { return }
  rowHasChanged() { return true }


  //__________________________________________________________


  removeTask = (taskId, date) => {
    // db.doc(`users/${userName}/tasks/${date}`)
    // firebase.firestore.FieldValue.delete()
    let allTasks = this.state.tasks
    let removedTasks = []
    let selectedTaksList = allTasks[date][0]
    for (var i in selectedTaksList) {
      if (selectedTaksList[i].id !== taskId) {
        removedTasks.push(selectedTaksList[i])
      } if (selectedTaksList[i].id === taskId) {
        console.log(selectedTaksList[i]);
      }
    }
    // console.log(selectedTaksList);

    allTasks[date][0] = removedTasks
    this.setState({ tasks: allTasks })
    db.collection('users').doc(userName).collection('tasks').doc(date).update({
      [taskId]: firebase.firestore.FieldValue.delete()
    })

  }
  markCompleted = (taskId, date,title,time) => {
    let allTasks = this.state.tasks
    let changedTaskList = allTasks[date][0]
    for (var i in changedTaskList) {
      if (changedTaskList[i].id === taskId) {
        changedTaskList[i].isCompleted = !changedTaskList[i].isCompleted
      }
    }
    allTasks[date][0] = changedTaskList
    this.setState({ tasks: changedTaskList })
    let docRef = db.doc(`users/${userName}/tasks/${date}`)
    let updatedTask = {}
   
      console.log("********* ", updatedTask)
      docRef.update({
        [taskId]: {
          isCompleted: true, id: taskId, title: title, time: time
        }
      }).then(() => console.log('***********   marked completed'))
    
    



  }

  addTask = (title) => {

    let id = uuid.v4()
    let time = getCurrentTime()
    let newTask = { id: id, time: time, title: title, isCompleted: false }
    let tasks = this.state.tasks

    let date = this.state.selectedDate.toISOString().split('T')[0]
    if (tasks[date]) {
      tasks[date][0].push(newTask)
      this.setState({ tasks: tasks })
      let docRef = db.doc(`users/${userName}/tasks/${date}`)
      docRef.get().then((doc) => {

        if (doc && doc.exists) {
          docRef.update({
            [id]: newTask
          })
        } else {
          docRef.set({
            [id]: newTask
          })
        }
      })
    } else {
      tasks[date] = [[]]
      this.addTask(title)

    }
  }

  getTasksComponents(item, day, removeTask, markCompleted) {
    if (item) {
      return item.map(function (task, index) {

        return <Task key={index} index={index} day={day} task={task} removeTask={removeTask} markCompleted={markCompleted} />;
      });
    }
  }
  setTasksArray = async (date) => {
    let resultArr = this.state.tasks
    if (resultArr[date]) {
      await db.doc(`users/${userName}/tasks/${date}`).get().then((tasks) => {
        if (tasks.exists && tasks) {

          let data = tasks.data()
          for (var i in data) {
            resultArr[date][0].push(data[i])
          }

          this.setState({ tasks: resultArr })
          this.setState({isLoading:false})
        }
      })
    } else {

      resultArr[date] = [[]]
      this.setTasksArray(date)
    }
  }
  pushToTasksArray = (date, dataArray) => {
    let tasksArray = this.state.tasks
    if (tasksArray[date]) {
      for (var i in dataArray) {
        tasksArray[date][0].push(dataArray[i])
      }
      this.setState({ tasks: tasksArray })
    }

  }
  renderTasks = (day, item) => {

    if (day.dateString === this.state.selectedDate.toISOString().split('T')[0]) {
      console.log("......... rendered");
      let tasks = this.getTasksComponents(item, day, this.removeTask, this.markCompleted);

      this.setState({
        selectedDayTasks: tasks,
      });
      return (
        <View style={{ width: "100%", height: "200%" }}>
          <Topdate
            selectedDate={this.state.selectedDate}
            scrollEnabled="false"
          />
          <View style={styles.tasks}>{tasks}</View>
        </View>
      );
    }

  };

  render() {

    console.log('Main renderer');
    return (
      <View style={styles.main}>
        {this.state.isLoading && <Loading/>}
        {!this.state.isLoading && <View style={styles.tasks_main}>
        <Calender
          items={this.state.tasks}
          renderTask={this.renderTasks}
          onDaypressed={this.onDaypressed}
          calenderToggeled={this.calenderToggeled}
          rowHasChanged={this.rowHasChanged}
          renderEmptyDate={this.renderEmptyDate}
        />

        {!this.state.isCalenderOpened && <Addbutton addTask={this.addTask} />}
        </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{width:'100%',height:'100%'},
  tasks_main: { width: "100%",
   height: "100%",
    zIndex: 10
   },

  tasks: {
    width: "100%",
    marginTop: 10,
    marginBottom: 120,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Tasks;
