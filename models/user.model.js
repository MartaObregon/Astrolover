const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
      type:String,
      required:true,
    },
    dateOfBirth: {
      type: Date,
      required:true,
    },
    horoscope: {
      type: String,
      enum: ["Cancer", "Scorpio", "Pisces", "Aries", "Leo", "Sagittarius", "Taurus", "Virgo", "Capricorn", "Gemini", "Libra", "Aquarius"],
    },
    age: {
      type: Number
    },
    occupation: {
      type: String,
    },
    genre: {
      type: String,
      enum: ["male", "female"]
    },
    catchPhrase: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    image_url:{
      type: String,
    },
 
    
    
    },
    {
        timestamps: true
    }
)
module.exports = model('user', userSchema)