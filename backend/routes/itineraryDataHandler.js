const express = require('express');
const { default: mongoose } = require('mongoose');
const Itinerary = require('../models/itinerarySchema');
const router = express.Router();
const passport = require('../passport');
const User = require('../models/userSchema');

router.post('/', async (req, res) => {
   
    let {id,name,destination,date,activities,completed,googleId} = req.body;
    let user = User.findOne({googleId:googleId}, (err, user) => {
        if(err) {
            console.log(err);
            res.send("Error Occured");
        }
        Itinerary.create({
            userId : user._id,
            id : id,
            name : name,
            destination : destination ,
            date : date ,
            activities : activities ,
            completed :completed 
        });
        res.send("SuccessFully Added");
    });
});



router.get("/history",async (req,res) =>{
    const email = passport.getUserEmail();
    console.log(email);
});

module.exports = router ;