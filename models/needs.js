var mongoose = require("mongoose");
var joi = require("joi");

var need = mongoose.model("need", new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
      },
      quantity: {
        type: String,
        minlength: 1,
        required: true,
      },
      description: {
        type: String,
        minlength: 10,
        required: true,
      },
      charity: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'charity'
      
      }
}))


function validateneed(need) {
    var schema = {
      name: joi.string().min(3).max(15).required(),
      quantity: joi.string().min(1).required(),
      description: joi.string().max(255).required(),
     
  
    };
    return joi.validate(need, schema)
  }
  
  exports.validateneed = validateneed;
  exports.need = need