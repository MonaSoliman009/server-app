const mongoose = require("mongoose")
var joi = require("joi");

var charity = mongoose.model("charity", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 25

  },
  img: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255

  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255
  },

  about:{
    type:String,
    max:600
  },

  phone: {
    type: String,
    min: 11,
    max: 14,
    required: true,

  },
  bankaccount: {
    type: String,
    unique: true

  },
  country: {
    type: String,
    required: true,
    maxlength: 50
  },
  address: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  follower:[
    {
      type: String
    }
  ] ,
  following:[ 
    {
    type: String
  }
],
  coverimg: {
    type: String
  }

}));


function validatecharity(charities) {
  var Schema = {
    name: joi.string().min(5).max(25).required(),
    img: joi.string(),
    email: joi.string().min(15).max(225).required(),
    password: joi.string().min(8).max(255).required(),
    phone: joi.string().min(11).max(14).required(),
    bankaccount: joi.string().max(20).required(),
    country: joi.string().max(15).required(),
    address: joi.string().min(5).max(55).required(),
    following:joi.string(),
    follower :joi.string()
  };
  return joi.validate(charities, Schema)
}
exports.validatecharity = validatecharity;

exports.charity = charity;
