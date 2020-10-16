const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')



router.get('/login', (req, res)=>{
  res.render('auth/login.hbs')
})


router.post('/login', (req, res)=>{
  const { username, password} = req.body
  //console.log('Jorge is the king of Spain!')
  UserModel.findOne({username: username})
    .then((userdata) => {
      if(!userdata){
        res.status(500).render('auth/signin.hbs', {message: 'User does not exist'})
      }
      //console.log('First: ', userdata)
      bcrypt.compare(password, userdata.password)
        .then((result) => {
            if(result){
              req.session.loggedInUser = userdata
              res.redirect('/dashboard/edit')
            } else {
              res.status(500).render('auth/register.hbs', {message: 'Passwords not matching'})
            }
        })
        .catch(()=>{
          console.log('Second: ', req.session)
          res.status(500).render('auth/login.hbs', {message: 'Something went wrong- Try again!'})
        })
      
  })
  
    
})

router.get('/register', (req, res)=>{
  res.render('auth/register.hbs')
})

router.post('/register', (req, res)=>{
  const {email, username, password, dateOfBirth} = req.body

  // VALIDATION
  //if some input is not filled - FOR ALL
  if(!username || !email || !password || !dateOfBirth){
    res.status(500).render('auth/register.hbs', {message: 'Please enter all details'})
  }
  //email
  let emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (!emailReg.test(email)) {
      res.status(500).render('auth/register.hbs', {message: 'Please enter valid email'})
  }
  //password
  let passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    if (!passwordReg.test(password)) {
      res.status(500).render('auth/register.hbs', {message: 'Password must have one lowercase, one uppercase, a number, a special character and must be atleast 8 digits long'})
  }
  //dateOfBirth
  let dateOfBirthReg = new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)
  if (!dateOfBirthReg.test(dateOfBirth)) {
    res.status(500).render('auth/register.hbs', {message: 'Please enter format: DD/MM/YYYY'})
}



  // CRYPTIN THE PASWORD
  bcrypt.genSalt(10)
    .then((salt) => {
      bcrypt.hash(password, salt)
        .then((hashedPassword) => {
          UserModel.create({
            email,
            username,
            password: hashedPassword,
            dateOfBirth
          })
            .then(() => {
              console.log('User created')
              res.redirect('/dashboard/edit')
            })
            .catch((err) => {
                res.render('error.hbs', err)
            })
        })
    })

})








module.exports = router;