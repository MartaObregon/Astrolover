const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const { getInfo} = require('../helpers/utils')
const UserModel = require('../models/User.model')
const MatchModel = require('../models/match.model')

const uploader = require('../config/coudinary.config.js');



router.get('/dashboard/home', (req, res)=>{
    id = req.session.loggedInUser._id
    // console.log('here In dashboard')
    UserModel.findById(id)
      .then((user)=>{
        let updatedUser = getInfo(user)
        res.render('dashboard/home.hbs', {user: updatedUser})
      })


})

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs', {username: req.session.loggedInUser.username})
  // console.log(req.session.loggedInUser)
  
})

router.post("/dashboard/edit", uploader.single("imageUrl"), (req, res, next) => { 
  const id = { _id: req.session.loggedInUser._id};
  const { occupation, genre, catchPhrase, phoneNumber, image_url} = req.body

  console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  //return 

  UserModel.findByIdAndUpdate(id, {
    occupation,
    genre,
    catchPhrase,
    phoneNumber,
    image_url: req.file.path,
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

router.get('/dashboard/datelog', (req, res)=>{

  

  let senderPromise = MatchModel.find({
    senderId: req.session.loggedInUser._id,
    status: "pending"
  }).populate('receiverId')



    let receiverPromise = MatchModel.find({
      receiverId: req.session.loggedInUser._id,
      status: "pending"
    }).populate('senderId')
    
    let matchDeclinedPromise= MatchModel.find({
      senderId : req.session.loggedInUser._id,
      status: "declined"
    }).populate('receiverId').populate('senderId')

    let matchConfirmedSenderPromise= MatchModel.find({
      senderId : req.session.loggedInUser._id,
      status: "confirmed"
    }).populate('receiverId').populate('senderId')


    let matchConfirmedReceiverPromise= MatchModel.find({
      receiverId : req.session.loggedInUser._id,
      status: "confirmed"
    }).populate('receiverId').populate('senderId')

      Promise.all([
        senderPromise,
        receiverPromise,
        matchDeclinedPromise,
        matchConfirmedReceiverPromise,
        matchConfirmedSenderPromise
      ])
        .then((usersArr)=>{
          // console.log(usersArr)
          res.render('dashboard/datelog.hbs', {username: req.session.loggedInUser.username, senderarr: usersArr[0], receiverarr: usersArr[1], matchesdeclinedarr: usersArr[2], matchesconfirmedRarr: usersArr[3], matchesconfirmedSarr: usersArr[4] })
        })

})

router.post('/dashboard/datelog/decline/:id', (req, res)=>{

let id = req.params.id
MatchModel.findByIdAndUpdate(id, {status:"declined"})
    .then(()=>{
      
      res.redirect('/dashboard/datelog')
    })

    .catch((err)=>{
      console.log("ERROR", err)
    })


})

router.post('/dashboard/datelog/confirm/:id', (req, res)=>{

  let id = req.params.id
  MatchModel.findByIdAndUpdate(id, {status:"confirmed"})
      .then(()=>{
        
        res.redirect('/dashboard/datelog')
      })
  
      .catch((err)=>{
        console.log("ERROR", err)
      })
  
  
  })

router.post('/dashboard/profile/:id', (req, res)=>{

  let id = req.params.id

  MatchModel.create({
    status: "pending",
    senderId: req.session.loggedInUser._id,
    receiverId: id
  })
    .then((data)=>{
      console.log("data",data)
      res.redirect('/dashboard/datelog')
    })

    .catch((err)=>{
      console.log("ERRORRRRRRRRRR", err)
    })


})

router.get('/dashboard/myPotentials', (req, res, next) => {
  console.log("string")
 let user = getInfo(req.session.loggedInUser)
   UserModel.find()
     .then((lover) => {
         let updatedUsers = lover.map((updatedUser)=>{
           return getInfo(updatedUser)
         }).filter((updatedUser)=>{
          return user.matching.includes(updatedUser.horoscope)
         })
         res.render('dashboard/myPotentials.hbs', {lover: updatedUsers, user})
     })
     .catch((err) => {
         console.log('Not working sorry')
     })
 });


router.get('/dashboard/profile/:id', (req, res)=>{
  let id = req.params.id
  UserModel.findById(id)
    .then((user)=>{
      res.render('dashboard/otherUser-profile.hbs', {user})
    })
  
})




module.exports = router;