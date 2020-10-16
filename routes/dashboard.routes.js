const express = require('express');
const router = express.Router();
// var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')

router.get('/dashboard/edit', (req, res)=>{
  res.render('dashboard/edit.hbs')
})


router.get('/dashboard/home', (req, res)=>{
  res.render('dashboard/home.hbs')
})




module.exports = router;