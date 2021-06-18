export function getCurrentTime(){
    let time = ''
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let timeType = ''
    if(hour <=11){
        timeType="AM"

    }else{
        timeType = 'PM'
    }
    if(hour >12){
        hour = hour-12
    }if(hour==0){
        hour =12
    }
    if(minute <10){minute = '0'+minute.toString()}
    
    time = hour.toString()+':'+minute.toString()+" "+timeType
    return time

}