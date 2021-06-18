import React from 'react'
// import { View,StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { agendaKnodColor } from '../constants/lightColors'
export default class Calender extends React.Component {
  
  
  // setAgendaKnobColor('red')
  shouldComponentUpdate(){
    console.log(`*********************      Upate Asked    *********************`);
    return false}
  render(){
    console.log("comming")
    return (
        <Agenda
        refreshing={true}
        
        items={this.props.items}
        onDayPress={this.props.onDaypressed}
        renderDay={this.props.renderTask}
        onCalendarToggled={this.props.calenderToggeled}
        rowHasChanged ={this.props.rowHasChanged}
        pastScrollRange={12}
        futureScrollRange={12}
        
        // onRefresh={() => console.log('refreshing...')}
        // refreshControl={()=>console.log('refresgin ...')}
        theme={{
          
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: agendaKnodColor
        }}
      
        // renderEmptyDate
      />
    )
  }
}
