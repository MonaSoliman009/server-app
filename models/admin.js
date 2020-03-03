var mongoose = require('mongoose');

var joi = require("joi");

var admin = mongoose.model("admin", new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true



  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}));


function validateadmin(admin) {
  var Schema = {
    password: joi.string().min(6).required(),
    email: joi.string().max(255).email().required(),


  };
  return joi.validate(admin, Schema)
}

exports.validateadmin = validateadmin;
exports.admin = admin;
