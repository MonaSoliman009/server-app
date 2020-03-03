var mongoose = require("mongoose");
var joi = require("joi");
const Schema = mongoose.Schema;
var donationmaterial = new Schema({
    donorName: {
        type: String,
       
      
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 15,
        required: true,
    },
    email: {
        type: String,
        maxlength: 255,
        lowercase: true,
        required: true
    },
    country:
    {
        type:String,
        required:true,
        maxlength:50
    },
    City:
    {
        type:String,
    //    required:true,
        maxlength:40
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 200,
        required: true,
    },
    // createdat: {
    //     type: Date
    // },
    charityname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    },
    type: String
});

function validatedonation(donation) {
    var schema = {
        donorName: joi.string(),
        email:joi.string().email().required(),
        phone: joi.String().min(11).max(15).required(),
        country: joi.String().required(),
        City: joi.String().required(),
        address: joi.String().required(),
        charityname:joi.string().required(),
        type:joi.string()
    };
    return joi.validate(donation, schema)
}

exports.validate = validatedonation;
// exports.users = users;

module.exports = mongoose.model('donationmaterial', donationmaterial);