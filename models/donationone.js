var mongoose = require("mongoose");
var joi = require("joi");

var donationpayment = mongoose.model("donationpayment", new mongoose.Schema({
  donor: {
    type: String,
    minlength: 6,
    required: true

  },
  email: {
    type: String,
    maxlength: 255,
    required: true

  },
  donorcreditnum: {
    type: String,
    minlength: 15,
    required: true

  },
  country: {
    type: String,
    maxlength: 50,
    required: true

  },
  City: {
    type: String,
    maxlength: 50,
    required: true

  },
  PostalCode: {
    type: String,
    required: true


  },
  charity: {
    type: String,
    minlength: 3,
    maxlength: 55,
    required: true

  },
  charityBankAccount: {
    type: String,
    maxlength: 15,
    required: true

  },
  amount: {
    type: Number,
    minlength: 1,
    required: true

  }
}));

function validatepayment(payment) {
  var Schema = {
    donor: joi.string().min(6).required(),
    email: joi.string().max(255).email().required(),
    donorcreditnum: joi.string().min(15).required(),
    charityBankAccount: joi.string().min(15).required(),
    amount: joi.number().min(1).required(),
    country: joi.string().max(50).required(),
    City: joi.string().max(50).required(),
    charity: joi.string().min(3).max(55).required(),
    PostalCode: joi.string().required()

  };
  return joi.validate(payment, Schema)
}

exports.validatepayment = validatepayment;
exports.donationpayment = donationpayment
