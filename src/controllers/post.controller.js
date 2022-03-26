const Post = require("../models/post.model");

const express = require("express");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.userId;
  try {
    const post = await Post.create(req.boody);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("", authenticate, async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
