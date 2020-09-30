const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
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

//  @route      POST api/user/admin
//  @desc       Register admin
//  @access     private, must have admin token key
router.post("/admin", registerAsAdmin, async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).send([
        {
          message: "An account has already been registered with this email",
        },
      ]);
    }
    const user = new User({ ...req.body, role: "admin" });
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

module.exports = router;
