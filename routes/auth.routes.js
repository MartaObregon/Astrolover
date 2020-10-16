const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')


router.get('/login', (req, res)=>{
  res.render('auth/login.hbs')
})

router.get('/register', (req, res)=>{
  res.render('auth/register.hbs')
})


router.post('/register', (req, res)=>{
  const {email, username, password, dateOfBirth} = req.body
  UserModel.create({
    email,
    username,
    password,
    dateOfBirth,
  })
      .then(()=>{
        console.log('User created')
        res.redirect('/dashboard/edit')
    })



})




module.exports = router;