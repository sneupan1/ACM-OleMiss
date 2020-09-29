const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
const auth = require("../middleware/auth");

//create user
router.post("/", async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).send([
        {
          message: "An account has already been registered with this email",
        },
      ]);
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    const profile = new Profile({ user: user._id });
    await profile.save();
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.errors) {
      return res.status(400).send(Object.values(err.errors));
    }
    res.status(500).send(err.message);
  }
});

//get user
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

//get all users
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/");

module.exports = router;
