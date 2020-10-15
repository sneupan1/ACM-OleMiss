const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
const OfficerApplication = require("../models/officerApplication");
const auth = require("../middleware/auth");
const registerAsAdmin = require("../middleware/registerAsAdmin");

//  @route      POST api/user/
//  @desc       Register basic user
//  @access     Public
router.post("/", async (req, res) => {
  try {
    if (
      req.body.role &&
      (req.body.role.toLowerCase() === "officer" ||
        req.body.role.toLowerCase() === "admin")
    ) {
      return res.status(400).send([
        {
          message:
            "You must be registered as a member and then approved by admin for an officer account",
        },
      ]);
    }
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

//  @route      GET api/user/me
//  @desc       Get current user
//  @access     Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      POST api/user/login
//  @desc       login user
//  @access     Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send([{ message: err.message }]);
  }
});

//  @route      POST api/user/logout
//  @desc       logout user
//  @access     private
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send([{ message: "Logged Out" }]);
  } catch (err) {
    res.send(500).send(err.message);
  }
});

module.exports = router;
