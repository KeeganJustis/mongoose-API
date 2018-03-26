const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require("../models/User");

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => res.status(200).json(blogs))
        .catch(err => res.status(500).send('An internal server error has occured'));
});


//work on this 
router.get('/featured', (req, res) => {
    Blog
        .where({ blogs: "featured" })
        .then(blogs => res.status(200).json(blogs))
        .catch(err => res.status(500).send('An internal server error has occured'));
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    Blog
        .findById(id)
        .then(blogs => (blogs ? (res.status(200).json(blogs)) : res.status(404).send()))
        .catch(err => res.status(500).send('An internal server error has occured'));

});

// .then(users =>  (User ? (res.status(200).json(users)) : res.status(404).send())


router.post('/', (req, res) => {
    let theUser;
    let newBlog = new Blog(req.body);

    User
        .findById(req.body.authorId)
        .then(user => {
            // console.log("--- USER FROM DB ---");
            // console.log("user", user);

            theUser = user;
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            console.log("SAved blog is", blog);

            theUser.blogs.push(blog);
            theUser
                .save()
                .then(() => res.status(201).send(blog))
        });
});









router.put('/:id', (req, res) => {
    var id = req.params.id;
    Blog
        .findByIdAndUpdate(id , {$set: req.body})
        // .findByIdAndUpdate(id)
        .then(blogs => {
            res.status(204).json(blogs)
        })
        .catch(err => res.status(500).send('An internal server error has occured'));
});





router.delete('/:id', (req, res) => {
    var id = req.params.id;
    Blog
        .findByIdAndRemove(id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

module.exports = router;