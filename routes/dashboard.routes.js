const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs', {username: req.session.loggedInUser.username})
})


router.get('/dashboard/home', (req, res)=>{
  res.render('dashboard/home.hbs', {username: req.session.loggedInUser.username})
})




module.exports = router;