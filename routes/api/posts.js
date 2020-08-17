const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@router   api/posts
//@des      Create a post
//@access   Private

router.post(
  "/",
  [auth, [body("text", "Add a comment").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //find user
      const user = await User.findById(req.user.id).select("-password");

      //see if the profile exists
      const profile = await Profile.findOne({ user: req.user.id }).select(
        "-password"
      );

      const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        status: profile.status,
        location: profile.location,
        company: profile.company,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@router   api/posts
//@des      Get all the posts
//@access   Public

router.get("/", auth, async (req, res) => {
  try {
    //find all posts
    const getAllPosts = await Post.find().sort({ date: -1 });

    //store all posts
    res.json(getAllPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router   api/posts/:post_id
//@des      Get posts by id
//@access   Private

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "No post" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router   api/posts/:post_id
//@des      Delate post by id
//@access   Private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    //find post by id
    const post = await Post.findById(req.params.post_id);

    //if it post doesnt exits
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //nu intele? post.user is an object .toString method turns it into a string to compare it with req.user.id
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server not found");
  }
});

//@router   api/posts/like/:post_id
//@des      Like a post
//@access   Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    //fetch a post
    const post = await Post.findById(req.params.id);

    //check to see if the post was already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "The post was already liked" });
    }
    //if it wasn't liked ????????? UNSHIFT
    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server not found");
  }
});

//@router   api/posts/unlike/:post_id
//@des      Unlike a post
//@access   Private

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    //fetch a post
    const post = await Post.findById(req.params.post_id);

    //check to see if the post was already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "You must like the post first" });
    }

    //remove index/like
    const removeLike = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeLike, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server not found");
  }
});

//@router   api/posts/comment/:id
//@des      Add a comment
//@access   Private

router.post(
  "/comment/:id",
  [auth, [body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //get the user that wants to post a comment
      const user = await User.findById(req.user.id).select("-password");

      //see if the profile exists
      const profile = await Profile.findOne({ user: req.user.id }).select(
        "-password"
      );

      //Fetch the post
      const post = await Post.findById(req.params.id);

      //build the comment object
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        status: profile.status,
      };

      //add the comment at the begging of the list
      post.comments.unshift(newComment);

      //update the post to include the new comment
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@router   api/posts/comment/:id/:comment_id
//@des      Delete a comment
//@access   Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //fetch the post you want to delete the comment
    const post = await Post.findById(req.params.id);

    //get the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //see if the comment doesnt belong to the user show error
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    //Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Find the index and remove it
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
