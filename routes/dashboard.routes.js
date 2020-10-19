const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model')



function getHoroscope(day, month){
         


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
router.get('/dashboard/home', (req, res)=>{
    id = req.session.loggedInUser._id
    UserModel.findById(id)
      .then((user)=>{
        let age = getAge(user.dateOfBirth)
        var today = new Date(user.dateOfBirth)
       let day = today.getDay();
       let month= today.getMonth();
       let horoscope = getHoroscope(day, month)
        console.log(user)
        user.dateofBirth = age
        user.horoscope = horoscope
        res.render('dashboard/home.hbs', {user})
      })


})

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs', {username: req.session.loggedInUser.username})
  console.log(req.session.loggedInUser)
  
})

router.post("/dashboard/edit", (req, res, next) => { 
  const id = { _id: req.session.loggedInUser._id};
  const { occupation, genre, catchPhrase, phoneNumber, image_url} = req.body

  UserModel.findByIdAndUpdate(id, {
    occupation,
    genre,
    catchPhrase,
    phoneNumber,
    image_url,
  })
    .then(() => {
      console.log("Data was updated successfully.");
      res.redirect("/dashboard/home");
    })
    .catch((err) => {
      console.log("Something has gone horribly wrong in editing.", err);
      res.redirect("/dashboard/home");
      next()
    });
});
/*
ç

*/
router.get('/dashboard/datelog', (req, res)=>{
  res.render('dashboard/datelog.hbs', {username: req.session.loggedInUser.username})
})

router.get('/dashboard/otherUser-profile', (req, res)=>{
  res.render('dashboard/otherUser-profile.hbs', {username: req.session.loggedInUser.username})
})

/*
router.get('/dashboard/myPotentials', (req, res)=>{
  res.render('dashboard/myPotentials.hbs', {username: req.session.loggedInUser.username})
})
*/
router.get('/dashboard/myPotentials', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  // Iteration #2: List the drones // we have to find them
  UserModel.find()
    .then((lover) => {
        console.log('my lover is ', lover)
        res.render('dashboard/myPotentials.hbs', {lover})
    })
    .catch((err) => {
        console.log('Not working sorry')
    })
});







module.exports = router;