const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
const adminAuth = require("../middleware/adminAuth");
const registerAsAdmin = require("../middleware/registerAsAdmin");

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

//  @route      PATCH api/user/:id/makeadmin
//  @desc       assign admin role to people
//  @access     private, needs to be admin
router.patch("/:id/makeadmin", adminAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user.role = "admin";
    await user.save();
    const profile = await Profile.findOne({ user: user._id }).populate("user", [
      "name",
      "email",
      "role",
    ]);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
