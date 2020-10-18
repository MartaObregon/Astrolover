const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')



router.get('/dashboard/home', (req, res)=>{
  res.render('dashboard/home.hbs', {username: req.session.loggedInUser.username})
})

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs', {username: req.session.loggedInUser.username})
})
/*
router.post("/dashboard/edit", (req, res, next) => {
  const id = req.params.id;
  UserModel.useFindAndModify(id, { $set: req.body })
    .then(() => {
      console.log("Data was updated successfully.");
      res.redirect("/dashboard/home");
    })
    .catch((err) => {
      console.log("Something has gone horribly wrong in editing.", err);
      res.redirect("/dashboard/home");
    });
});

router.post('/dashboard/edit', (req, res)=>{
  const { horoscope, age, occupation, genre, catchPhrase, phoneNumber} = req.body
  //console.log('Jorge is the king of Spain!')
  UserModel.findOneAndUpdate({
    horoscope: horoscope, 
    age: age, 
    occupation: occupation, 
    genre: genre, 
    catchPhrase: catchPhrase, 
    phoneNumber: phoneNumber
  })
    .then(()=>{
      console.log('Profile set up!')
      res.redirect('/dashboard/home')
    })
    .catch((err) => {
      console.log(err)
      res.render('error.hbs', err)
  })
  
    
})

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