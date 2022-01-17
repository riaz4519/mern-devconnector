const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post models
const Post = require("../../models/Post");

// validation
const validatePostInput = require("../../validation/post");
const { route } = require("./profile");

//@route GET api/posts/test
//@desc Test post route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "posts workds" });
});

//@route Get api/posts
//@desc create posts
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "no posts found" }));
});

//@route Get api/posts/:id
//@desc create post by id
//@access public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "no post found with that" })
    );
});

//@route Post api/posts
//@desc create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any erros , send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    //save
    newPost.save().then((post) => {
      res.json(post);
    });
  }
);

//@route DELETE api/posts
//@desc delete post
//@access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the post
    Post.findById(req.params.id)
      .then((post) => {
        //check for the user
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "user not authorized" });
        }

        //delete post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ postnofound: "no post found" }));
  }
);

//@route POST api/posts/like/:id
//@desc like post
//@access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the post

    Post.findById(req.params.id)
      .then((post) => {
        //check for the user

        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        //add user id to likes array
        post.likes.unshift({ user: req.user.id });

        //save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnofound: "no post found" }));
  }
);

//@route POST api/posts/unlike/:id
//@desc unlike post
//@access private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the post

    Post.findById(req.params.id)
      .then((post) => {
        //check for the user

        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "you have not yet liked this post" });
        }

        //get the remove index
        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        //save the post
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnofound: "no post found" }));
  }
);

//@route POST api/posts/comment/:id
//@desc comment on a  post
//@desc private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors ,send 400 with errors object

      return res.status(400).json(errors);
    }

    //post by id
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        //add to comment array
        post.comments.unshift(newComment);
        //save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.json({ postnotfound: "no post found" }));
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc remove comment from post
//@access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //post by id
    Post.findById(req.params.id)
      .then((post) => {
        //if exists comment then we can delete

        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).lenght === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "comment does not exists" });
        }

        //get the remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

          //splice comment out of array
          post.comments.splice(removeIndex, 1);

          //save
          post.save().then(post => res.json(post));
      })
      .catch((err) => res.json({ postnotfound: "no post found" }));
  }
);

module.exports = router;
