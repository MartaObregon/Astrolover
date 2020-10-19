const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const { getInfo} = require('../helpers/utils')
const UserModel = require('../models/User.model')




router.get('/dashboard/home', (req, res)=>{
    id = req.session.loggedInUser._id
    console.log('here In dashboard')
    UserModel.findById(id)
      .then((user)=>{
        let updatedUser = getInfo(user)
        console.log(updatedUser)
        res.render('dashboard/home.hbs', {user: updatedUser})
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
 
  UserModel.find()
    .then((lover) => {
        let updatedUsers = lover.map((updatedUser)=>{
          return getInfo(updatedUser)
        })
      
        console.log('my lover is ', updatedUsers)
        res.render('dashboard/myPotentials.hbs', {lover: updatedUsers})
    })
    .catch((err) => {
        console.log('Not working sorry')
    })
});







module.exports = router;