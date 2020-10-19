function getHoroscope(day, month){
         
  console.log("horoscope")
  console.log(month, day)

  if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
    return 'Capricorn';
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return 'Aquarius';
  } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return 'Pisces';
  } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return 'Aries';
  } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return 'Taurus';
  } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return 'Gemini';
  } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return 'Cancer';
  } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return 'Leo';
  } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return 'Virgo';
  } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return 'Libra';
  } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return 'Scorpio';
  } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return 'Sagittarius';
  }
}

function getAge(DOB) {
  var today = new Date();
  var birthDate = new Date(DOB);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
  }
  return age;
}

function getInfo(lover){
  console.log("Inside utils", lover)
  let user = JSON.parse(JSON.stringify(lover))
  var today = new Date(user.dateOfBirth)
  console.log('TODAY', today)
  let day = today.getDate();
  let month= today.getMonth()+ 1;
  let horoscope = getHoroscope(day, month)
  let age = getAge(user.dateOfBirth)
     

     user.dateOfBirth = age
      user.horoscope = horoscope

      return user
}







module.exports={
  getInfo,
}