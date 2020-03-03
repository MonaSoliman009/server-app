const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const route = express.Router();
const DonateMaterial = require("../models/donation(material)")


var parseUrlencoded = bodyparser.urlencoded({ extended: true })


route.post("/material", parseUrlencoded, (req, res) => {
    
    const donateMaterial = new DonateMaterial()
        donateMaterial.donorName= req.body.donorName
        donateMaterial.email= req.body.email
        donateMaterial.phone= req.body.phone
        donateMaterial.country= req.body.country
        donateMaterial.City= req.body.City
        donateMaterial.address= req.body.address
        donateMaterial.charityname= req.body.charityname
        donateMaterial.type= req.body.type
    


    donateMaterial.save((error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json()
            console.log(data)
        }

    })
})


module.exports = route