const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const auth = require("../middleware/auth");

//get user profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//get all profiles

router.get("/all");
module.exports = router;
