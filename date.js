module.exports.articleDate = function getDate (){
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    }

    let date= new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours= date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
     day= checkTime(day)
     month= checkTime(month)
     hours= checkTime(hours)
     minutes= checkTime(minutes)
      seconds= checkTime(seconds)

    let message = "Publicat pe "+ day +"."+month+"."+year+" la "+hours+":"+minutes+":"+seconds
    
    return message
}

