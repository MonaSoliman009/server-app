var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var auth = require('../middleware/auth');

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});

var {
    validateneed,
    need
} = require("../models/needs");
var {
    charity
  } = require("../models/charity");

router.post("/add/:id",parseUrlencoded, function (req, res) {
    console.log("hey");
    var {
        error
      } = validateneed(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
   let needs = new need({
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
        charity: req.params.id,
      
      });
      needs.save();
res.json(needs)
  });


router.get("/list/:id",async(req,res)=>{
let needspec= await need.find({charity:req.params.id},function(err,data){

    if(err){
        console.log(err)
    }

})

if(needspec){

    res.json(needspec)
}



})

router.post("/update/:id",parseUrlencoded,function(req,res){

need.update({_id:req.params.id},req.body,function(err,data){
    if(err){
        console.log(err)
    }
    res.send(data)
})

})







router.delete("/delete/:id",parseUrlencoded,function(req,res){

need.remove({_id:req.params.id},function(err){
    if(err){
        console.log(err)
    }
})

res.json("done")
})
  module.exports = router;
