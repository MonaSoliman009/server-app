var mongoose = require('mongoose');

var joi = require("joi");
const Schema = mongoose.Schema
const post = new Schema({

  title: String,
  createdat: {
    type: Date
  },
  content: {
    type: String,
    maxlength: 600
  },

  postedby:
  {
    type: mongoose.Schema.Types.ObjectId,
    enum: ['volunteer', 'charity']
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  },
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'like'
  }

});

module.exports = mongoose.model("post", post)    