var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});
const volunteer = require('../models/volunteer');
const charity = require('../models/charity');


route.get('/listcharity',(req,res)=>{
    mongoose.model('charity').find().select('name country').then(listcharity=>{
      
        res.json(listcharity)
    }).catch(err=>{
        res.json(err)
    })
})
route.get('/listvolunteer',(req,res)=>{
    mongoose.model('volunteer').find().select('fname lname country').then(listvolunteer=>{
        res.json(listvolunteer)
    }).catch(err=>{
        res.json(err)
    })
})
module.exports=route;
