var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("config");
const multer = require("multer");
const path = require("path");
var bcrypt = require("bcryptjs");

var auth = require('../middleware/auth');
var {
  validatevolunteer,
  volunteer
} = require("../models/volunteer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});




router.post("/signup", upload.single("img"), parseUrlencoded, async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  var {
    error
  } = validatevolunteer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let volunterr = await volunteer.findOne({
    email: req.body.email
  });
  if (volunterr) {
    return res.status(400).send("user already registered.");
  }

  volunterr = new volunteer({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    Age: req.body.Age,
    phone: req.body.phone,
    country: req.body.country,
    img: req.body.img,
  });

  var salt = await bcrypt.genSalt(10);
  volunterr.password = await bcrypt.hash(volunterr.password, salt);
  await volunterr.save();

  
  res.status(200).json({
    volunterr,
    Request: {
      type: "GET",
      url: "http://localhost:3000/volunteers/" + volunterr._id
    }
  });
});

router.post("/coverimg/:id", upload.single("coverimg"),function(req,res){
  let volunterr =  volunteer.findOne({
    _id: req.body.id
  });
  if( volunterr ){
    volunterr=new volunteer ({

      coverimg:req.body.coverimg
    })

  }
 
res.status(200).json("done")


})
router.get("/account/:id", auth, async (req, res) => {

  console.log("hi hi")
  let volunterspec = await volunteer.findOne({
    _id: req.params.id
  });

  res.json(volunterspec)
});



module.exports = router;
