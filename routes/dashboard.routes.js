const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')



router.get('/dashboard/home', (req, res)=>{
  console.log(req.session)
  let user = req.session.loggedInUser
  res.render('dashboard/home.hbs', {user})
})

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs', {username: req.session.loggedInUser.username})
  console.log(req.session.loggedInUser)
  
})

router.post("/dashboard/edit", (req, res, next) => { 
  const id = { _id: req.session.loggedInUser._id};
  const { horoscope, occupation, genre, catchPhrase, phoneNumber} = req.body

      function getAge(DOB) {
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }
        // console.log('today´s date:', today)
        // console.log('the person age:', age)
        return age;

      }
      let dateB = req.session.loggedInUser.dateOfBirth

      let ageVariable = getAge(dateB)


  UserModel.findByIdAndUpdate(id, {
    horoscope,
    age: ageVariable,
    occupation,
    genre,
    catchPhrase,
    phoneNumber,
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