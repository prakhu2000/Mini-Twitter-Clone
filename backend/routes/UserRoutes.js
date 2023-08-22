const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware=require("../middleware/authmiddleware")
const User = require("../models/User");



router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully" ,token});
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});


router.get("/isFollower/:authorId",authMiddleware, async (req, res) => {
  try {
    const {authorId}=req.params;
    const user = await User.findById(req.user.userId).populate("following");
    let followingId=[];
    followingId = user.following.filter((follower) => (follower._id===authorId));
    if(followingId.length){
      res.status(201).json({ message: true});
    }
    else res.status(201).json({ message: false });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tweet" });
  }
});

router.get("/isLoggedIn",authMiddleware, async (req, res) => {
  try {
    res.status(201).json({ message: true});
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred",message:false });
  }
});

router.get("/allfollowingIds", async (req, res) => {
  const user = await User.find();

  res.json({message: user});
})

router.get("/findPeople",authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).populate("following");
  // console.log("user",user);
  let followingIds=[];
  followingIds = user.following.filter((follower) => (follower._id!=req.user.userId));
  // console.log("followingIds",followingIds);
  let people = await User.find({ _id: { $nin: followingIds } })  
  // console.log("people",people);
  res.json({message: people});
})

router.get("/myProfile",authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).populate('followers').populate('following').select('-password');
  res.json({message: user});
})

module.exports = router;
