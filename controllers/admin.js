var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var auth = require('../middleware/auth');

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});

var {
  validateadmin,
  admin
} = require("../models/admin");
var {
  volunteer
} = require("../models/volunteer");
var {
  charity
} = require("../models/charity");



router.get("/charity/list",async(req,res)=>{
  let result = await   charity.find({});
res.json(result)





})


router.get("/volunteer/list",async(req,res)=>{
  let result = await   volunteer.find({});
res.json(result)





})

router.delete("/volunteer/delete/:id", function (req, resp) {

  mongoose.model("volunteer").findOneAndRemove({
      _id: req.params.id
    },
    function (err, data) {
      if (!err) {
      }
    })

  resp.json("volunteer done")
})


router.delete("/charity/delete/:id", function (req, resp) {

  mongoose.model("charity").findOneAndRemove({
      _id: req.params.id
    },
    function (err, data) {
      if (!err) {
        console.log("Deleted");
      }
    })

  resp.json("charity done")
});


router.post("/add", parseUrlencoded, async (req, res) => {
  var {
    error
  } = validateadmin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let new_admin = new admin({
    password: req.body.password,
    email: req.body.email,

  });
  var salt = await bcrypt.genSalt(5);
  new_admin.password = await bcrypt.hash(new_admin.password, salt);
  await new_admin.save();
  res.json(new_admin);
});


router.get("/account/:id", auth, async (req, res) => {

  let adminspec = await admin.findOne({
    _id: req.params.id
  });

  res.json(adminspec)
});

module.exports = router;
