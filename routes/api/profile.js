const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//profile validation
const validateProfileInput = require("../../validation/profile");

//load profile experience validation
const validateExperienceInput = require("../../validation/experience");

//load profile education validation
const validateEducationInput = require("../../validation/education");

//load profile model
const Profile = require("../../models/Profile");

//load user Profile
const User = require("../../models/User");
const profile = require("../../validation/profile");

//@route GET api/profile/test
//@desc Test profile route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "profile workds" });
});

//@route GET api/profile
//@desc Get current users profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//@route GET api/profile/all
//@desc Get all profile
//@access Public

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find();
  populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There is no profiles";

        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "There is no profiles" }));
});

//@route GET api/profile/handle/:handle
//@desc Get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";

        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err(err)));
});

//@route GET api/profile/user/:user_id
//@desc Get profile by user id
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";

        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});

//@route POST api/profile
//@desc create or edit user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills  - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //social
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //update or create
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //updatemon
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => {
          return res.json(profile);
        });
      } else {
        //create

        //check if handle exists
        Profile.findOne({ handle: req.body.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then((profile) => {
            res.json(profile);
          });
        });
      }
    });
  }
);

//@route POST api/profile/experience
//@desc Add experience to profile
//@access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 errors

      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        loation: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      //add to expr array
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

//@route POST api/profile/education
//@desc Add education to profile
//@access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 errors

      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      //add to edu array
      profile.education.unshift(newEdu);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

//@route DELTE api/profile/exprerience/:exp_id
//@desc Delete experience from profile
//@access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //get remove index
      const removeIndex = profile.experience
        .map((item) => item._id)
        .indexOf(req.params.exp_id);


        //splice out of array
        profile.experience.splice(removeIndex, 1);

        profile.save().then((profile) => res.json(profile));
    }).catch((err) =>  res.json(err));


  }
);

//@route DELTE api/profile/education/:edu_id
//@desc Delete education from profile
//@access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //get remove index
      const removeIndex = profile.education
        .map((item) => item._id)
        .indexOf(req.params.edu_id);


        //splice out of array
        profile.education.splice(removeIndex, 1);

        profile.save().then((profile) => res.json(profile));
    }).catch((err) =>  res.json(err));


  }
);

//@route DELTE api/profile/
//@desc Delete user and profile 
//@access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {

        User.findOneAndRemove({_id : req.user.id}).then( () =>{

            res.json({ success: true })

        })

    }).catch((err) =>  res.json(err));


  }
);

module.exports = router;
