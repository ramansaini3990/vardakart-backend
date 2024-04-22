const mongoose = require('mongoose')

const userschema =  new mongoose.Schema(
    {
        username: {
          type: String,
          // required: true,
          // unique: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        firstName: {
          type: String,
          required: true
        },
        lastName: {
          type: String,
          required: true
        },
        dob: {
          type: String ,
          // required: true
        },
        phoneNumber: {
          type: Number,
          // required: true
        }, 
        address: {
          type: String,
          // required: true
        },
        token: {
              type: String,
              default: ''
              // required: true,
            },
      },
      { timestamps: true },

)

module.exports = mongoose.model('Users',userschema)