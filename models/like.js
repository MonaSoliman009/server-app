var mongoose = require('mongoose');

var joi = require("joi");
const Schema = mongoose.Schema
const like = new Schema({

    postedby:{
      type:mongoose.Schema.Types.ObjectId,
      enum:['volunteer','charity'],
     
    },
  
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
       
    }
    

})

module.exports = mongoose.model("like", like)  