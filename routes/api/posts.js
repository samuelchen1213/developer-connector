const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile')

// Load Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// $access  Public
router.get('/test', (req, res) => res.json({msg: "Posts Works!"}));

// @route   POST api/posts/
// @desc    Get posts
// $access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(err));
})

// @route   POST api/posts/:id
// @desc    Get post by id
// $access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostfound: 'No post found with this ID!'}));
})


// @route   POST api/posts/
// @desc    Create a post
// $access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Validation
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
})

// @route   GET api/posts/
// @desc    Get post
// $access  Public
router.get('/', (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Validation
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// $access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndDelete({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if(post.user.toString() !== req.user.id) {
                        res.status(401).json({notauthorized: 'No post found with this ID!'})
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({success: true}))
                        .catch(err => res.status(404).json({postnotfound: ''}))
                })
        });
})
module.exports = router;