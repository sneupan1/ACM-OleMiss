const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const auth = require("../middleware/auth");

//get user profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "email"]);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//get all profiles
router.get("/all", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.send(profiles);
  } catch (err) {
    res.status(500).send(err.messsage);
  }
});

module.exports = router;
