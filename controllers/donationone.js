var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var {
  validatepayment,
  donationpayment
} = require("../models/donationone");

router.post("/payment", parseUrlencoded, async (req, res) => {
  console.log("hey");
  var {
    error
  } = validatepayment(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let donation = new donationpayment({
    donor: req.body.donor,
    email: req.body.email,
    donorcreditnum: req.body.donorcreditnum,
    country: req.body.country,
    City: req.body.City,
    PostalCode: req.body.PostalCode,
    charity: req.body.charity,
    charityBankAccount: req.body.charityBankAccount,
    amount: req.body.amount
  });
  var salt = await bcrypt.genSalt(5);
  donation.donorcreditnum = await bcrypt.hash(donation.donorcreditnum, salt);
  await donation.save();
  res.json(donation);
});

module.exports = router;
