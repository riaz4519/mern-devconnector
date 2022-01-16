const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile model
const Profile = require("../../models/Profile");

//load user Profile
const User = require("../../models/User");

//@route GET api/profile/test
//@desc Test profile route
//@desc Public
router.get('/test',(req,res) => {
    res.json({ msg  : "profile workds" })
});

//@route GET api/profile
//@desc Get current users profile
//@desc Private
router.get('/',passport.authenticate('jwt',{session : false}), (req, res) => {

    const errors = {};

    Profile.findOne({ user : req.user._id})
    .then( profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err =>  res.status(404).json(err)  )
    
})

module.exports = router;