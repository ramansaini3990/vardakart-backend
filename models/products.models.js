const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      trim: true,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    gender:{
      type:String,
      default:true
    },
    token: {
      type: String,
      default: ''
      // required: true,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Products", productSchema);
