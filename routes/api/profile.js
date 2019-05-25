const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education')

// Load Profile Modal
const profile = require('../../models/Profile');
// Load User Profule
const user = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// $access  Public
router.get('/test', (req, res) => res.json({ msg: "Profile Works!" }));

// @route   GET api/profile
// @desc    Get current user profile
// $access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar']) // Take info from user
    .then( profile => {
        if (!profile) {
            errors.noprofile = 'Uh oh! We cant find this user!'
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create/edit user profile
// $access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    // Validation
    if (!isValid) return res.status(400).json(errors);

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - Split into Array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // Find Profile
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                // Profile existence means update
                Profile.findoneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true})
                .then(profile => res.json(profile));
            } else {
                // Create
                // Check if handle exists
                Profile.findOne({handle: profileFields.handle}).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }

                    // Save profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
});

// @route   GET api/profile/all
// @desc    Get all profiles
// $access  public

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles!';
                return res.status(404).json(errors)
            }
            res.json(profiles);
        })
        .catch(error => res.status(404).json({profile: 'There are no profiles!'}))
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// $access  public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile for this user!';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(error => res.status(404).json(error));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by id
// $access  public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile for this user!';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(error => res.status(404).json({profile: 'No profile for this user!'}));
});


// @route   GET api/profile/experience
// @desc    Add/edit experience to profile
// $access  private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body);

    // Validation
    if (!isValid) return res.status(400).json(errors);
    
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const experience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to experience array
            profile.experience.unshift(experience);
            profile.save().then(res.json(profile));
        })
})

// @route   GET api/profile/education
// @desc    Add/edit education to profile
// $access  private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body);

    // Validation
    if (!isValid) return res.status(400).json(errors);
    
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const education = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to experience array
            profile.education.unshift(education);
            profile.save().then(res.json(profile));
        })
})

module.exports = router;