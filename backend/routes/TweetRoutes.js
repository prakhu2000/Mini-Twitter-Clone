const express = require("express");
const router = express.Router();

const Tweet = require("../models/Tweet");
const User = require("../models/User");
const authMiddleware = require('../middleware/authmiddleware');


router.post("/add-tweet",authMiddleware, async (req, res) => {
  const { content } = req.body;

  try {
    const newTweet = new Tweet({ content, author: req.user.userId });
    await newTweet.save();
    res.status(201).json({ message: "Tweet created successfully", content: content, author: req.user.userId}, );
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the tweet" });
  }
});

router.get("/myTweets",authMiddleware, async (req, res) => {
  try {
    const tweets = await Tweet.find({ author: req.user.userId }).sort("-createdAt")
    .populate("author");
    res.status(201).json({ message: "Tweet fetched successfully",tweets});
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tweet" });
  }
});

router.put('/edit-tweet/:tweetId', authMiddleware, async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const tweet = await Tweet.findOneAndUpdate(
      { _id: tweetId, author: req.user.userId },
      { content },
      { new: true }
    );
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found or unauthorized' });
    }
    res.json({ message: 'Tweet updated successfully', tweet });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the tweet' });
  }
});

router.delete('/delete-tweet/:tweetId', authMiddleware, async (req, res) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findOneAndDelete({ _id: tweetId, author: req.user.userId });
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found or unauthorized' });
    }
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the tweet' });
  }
});

router.get("/timeline", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("following");
    const followingIds = user.following.map((follower) => follower._id);
    const timelineTweets = await Tweet.find({ author: { $in: followingIds } })
      .sort("-createdAt")
      .populate("author");
    res.json(timelineTweets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the timeline" });
  }
});

router.post("/follow/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log(req.params.userId);

  try {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentUser = await User.findById(req.user.userId);
    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      await currentUser.save();
      res.json({ message: "User followed successfully" });
    } else {
      res.json({ message: "You are already following this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while following the user" });
  }
});

router.post("/unfollow/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(req.user.userId);
    if (currentUser.following.includes(userId)) {
      currentUser.following.pull(userId);
      await currentUser.save();
      res.json({ message: "User unfollowed successfully" });
    } else {
      res.json({ message: "You are not following this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while unfollowing the user" });
  }
});

module.exports = router;
