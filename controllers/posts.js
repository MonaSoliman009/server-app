var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var parseUrlencoded= bodyParser.urlencoded({extended:true});

const app = express();


const postModel=require('../models/post');
const voluntermodel=require("../models/volunteer");
const {charity} =require("../models/charity")

 

router.post("/update/:id",(req,res)=>{
  postModel.findByIdAndUpdate(req.params.id,
    {
      $set:{title:req.body.title,content:req.body.content}
    },
    {new :true},
    function(err,updatepost){
if(err){
  console.log(err)
}
else{
  res.json(updatepost)
}

  })
});

router.delete("/delete/:id",(req,res)=>{
  postModel.findByIdAndRemove(req.params.id,(err,deletepost)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json(deletepost)
    }
  })

})






module.exports = router;