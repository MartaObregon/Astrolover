const express = require('express');
const router = express.Router();
const { getInfo} = require('../helpers/utils')
const UserModel = require('../models/user.model')
const MatchModel = require('../models/match.model')
const uploader = require('../config/cloudinary.config.js');



  router.get('/dashboard/home', (req, res)=>{
    
      if(!req.session.loggedInUser){
        res.redirect('/login')
        return
      }
      id = req.session.loggedInUser._id
      UserModel.findById(id)
        .then((user)=>{
          let updatedUser = getInfo(user)
          res.render('dashboard/home.hbs', {user: updatedUser})
        })


  })

  router.get('/dashboard/edit', (req, res)=>{
    res.render('dashboard/edit.hbs', {user: req.session.loggedInUser})
    
    
  })

  router.post("/dashboard/edit", uploader.single("imageUrl"), (req, res, next) => { 
    const id = { _id: req.session.loggedInUser._id};
    const { occupation, genre, catchPhrase, phoneNumber, image_url} = req.body

    // Validation for phone number
    if(!phoneNumber){
      res.status(500).render('dashboard/edit.hbs', {message: 'Please enter all details'})
    } else if (phoneNumber){
    let phoneNumberReg = new RegExp(/^\d{10}$/)
      if (!phoneNumberReg.test(phoneNumber)) {
        res.status(500).render('dashboard/edit.hbs', {message: 'Please enter valid 10 digit phone number'})
        return;
    }}
    
    // Cloudinary, redirect if the image file is missing
    if (!req.file) {
      res.redirect('/dashboard/home')
      return;
    }


    UserModel.findByIdAndUpdate(id, {
      occupation,
      genre,
      catchPhrase,
      phoneNumber,
      image_url: req.file.path,
    })
      .then(() => {
        console.log("Data was updated successfully.");
        UserModel.findById(id)
          .then((updateduser)=>{
            req.session.loggedInUser = updateduser
            res.redirect("/dashboard/home");
          })
        
      })
      .catch((err) => {
        console.log("Something has gone horribly wrong in editing.", err);
        res.redirect("/dashboard/home");
        next()
      })

  
    
  })

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
            res.render('dashboard/datelog.hbs', {user: req.session.loggedInUser, senderarr: usersArr[0], receiverarr: usersArr[1], matchesdeclinedarr: usersArr[2], matchesconfirmedRarr: usersArr[3], matchesconfirmedSarr: usersArr[4] })
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
        let lover = getInfo(user)
        res.render('dashboard/otherUser-profile.hbs', {user: lover})
      })
    
  })




module.exports = router;