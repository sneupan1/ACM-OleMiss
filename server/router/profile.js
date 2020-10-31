const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const auth = require("../middleware/auth");
const officerAuth = require("../middleware/officerAuth");
const multer = require("multer");
const sharp = require("sharp");

//  @route      POST api/profile/me
//  @desc       Register basic user profile
//  @access     Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "email", "role"]);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      POST api/profile/all
//  @desc       Register basic user profile
//  @access     Private
router.get("/all", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "role",
    ]);
    res.send(profiles);
  } catch (err) {
    res.status(500).send(err.messsage);
  }
});

//  @route      PATCH api/profile/me
//  @desc       UPDATE CURRENT PROFILE
//  @access     Private
router.patch("/me", auth, async (req, res) => {
  try {
    if (req.body.dues) {
      delete req.body.dues;
    }
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      {
        new: true,
      }
    ).populate("user", ["name", "email", "role"]);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      Delete api/profile/me
//  @desc       delete current user profile
//  @access     Private
router.delete("/me", auth, async (req, res) => {
  try {
    await Profile.deleteOne({ user: req.user._id });
    await req.user.delete();
    res.send([{ message: "Account Removed Successfully" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      GET api/profile/:id
//  @desc       get profile by ID
//  @access     Private
router.get("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    }).populate("user", ["name", "email", "role"]);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      Delete api/profile/:id
//  @desc       delete profile and account by ID
//  @access     Private
router.delete("/:id", officerAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    }).populate("user", ["role"]);

    if (req.user.role === "officer" && profile.user.role !== "basic") {
      return res.status(401).send([
        {
          message: "Not authorized to do this!",
        },
      ]);
    }
    await User.deleteOne({ _id: profile.user._id });
    await profile.delete();
    res.send([{ message: "Account Removed Successfully" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//trying file upload
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload jpeg, jpg or png file only"));
    }
    cb(undefined, true);
  },
});

//  @route      POST api/profile/me/avatar
//  @desc       add avatar to current profile
//  @access     Private
router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "email", "role"]);
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    profile.avatar = buffer;
    await profile.save();
    res.send(profile);
  },
  (err, req, res, next) => {
    res.status(400).send([{ message: err.message }]);
  }
);

//  @route      DELETE api/profile/me/avatar
//  @desc       DELETE avatar from current profile
//  @access     Private
router.delete("/me/avatar", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "email", "role"]);
    profile.avatar = undefined;
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(400).send([{ message: err.message }]);
  }
});

//  @route      GET api/profile/:id/avatar
//  @desc       FETCH avatar using profile :ID
//  @access     public
router.get("/:id/avatar", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    }).populate("user", ["name", "email", "role"]);

    if (!profile.avatar) {
      throw new Error("Avatar not found");
    }
    res.set("Content-Type", "image/png");
    res.send(profile.avatar);
  } catch (err) {
    res.status(400).send([{ message: err.message }]);
  }
});

module.exports = router;
