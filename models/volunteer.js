var mongoose = require("mongoose");
var joi = require("joi");

var volunteer = mongoose.model("volunteer", new mongoose.Schema({
  fname: {
    type: String,
    minlength: 3,
    maxlength: 7,
    required: true,
  },
  lname: {
    type: String,
    minlength: 3,
    maxlength: 7,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    maxlength: 255,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  Age: {
    type: String,
    maxlength: 3,
    required: true
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 14,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  coverimg: {
    type: String
  }
}))


function validatevolunteer(volunteers) {
  var schema = {
    fname: joi.string().min(3).max(7).required(),
    lname: joi.string().min(3).max(7).required(),
    email: joi.string().max(255).email().required(),
    password: joi.string().min(5).max(255).required(),
    Age: joi.string().min(2).max(3).required(),
    phone: joi.string().min(11).max(14).required(),
    country: joi.string().min(5).max(7).required(),
    img: joi.string(),
    coverimg: joi.string()

  };
  return joi.validate(volunteers, schema)
}

exports.validatevolunteer = validatevolunteer;
exports.volunteer = volunteer
