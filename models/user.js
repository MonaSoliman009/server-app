const mongoose = require("mongoose")
const joi = require("joi");

const Schema = mongoose.Schema
const userschema = new Schema([{
    charity:{
        type:Schema.Types.ObjectId,
        ref:"charity"
    },
    volunteer:{
        type:Schema.Types.ObjectId,
        ref:"volunteer"
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"admin"
    },
}])

module.exports = mongoose.model("user", userschema)