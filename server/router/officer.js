const express = require("express");
const router = new express.Router();
const OfficerApplication = require("../models/officerApplication");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const User = require("../models/user");
const officerAuth = require("../middleware/officerAuth");
const Profile = require("../models/profile");

//  @route      POST api/user/officer
//  @desc       Submit officer application request to admin for approval
//  @access     private
router.post("/officer", auth, async (req, res) => {
  try {
    if (req.user.role === "basic") {
      var officerApplication = await OfficerApplication.findOne({
        user: req.user._id,
      });
      if (officerApplication) {
        return res
          .status(400)
          .send([{ message: "An approval request has already been sent" }]);
      }
      officerApplication = new OfficerApplication({ user: req.user._id });
      officerApplication.save();
      res.status(201).send(officerApplication);
    } else {
      res.status(400).send([
        {
          message: "Not applicable",
        },
      ]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      GET api/user/officer/applications
//  @desc       get all officers application
//  @access     private, needs to be admin
router.get("/officer/applications", adminAuth, async (req, res) => {
  try {
    const applications = await OfficerApplication.find().populate("user", [
      "name",
      "email",
    ]);
    if (!applications) {
      return res.status(400).send([
        {
          message: "Currently there are no requests",
        },
      ]);
    }
    res.send(applications);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      PATCH api/user/officer/application/:id
//  @desc       approve officers application request by admin
//  @access     private, needs to be admin
router.patch("/officer/application/:id", adminAuth, async (req, res) => {
  try {
    const application = await OfficerApplication.findOne({
      _id: req.params.id,
    });
    const user = await User.findOne({ _id: application.user });
    user.role = "officer";
    await user.save();
    await application.delete();
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      DELETE api/user/officer/application/:id
//  @desc       reject and delete officer application
//  @access     private, needs to be admin
router.delete("/officer/application/:id", adminAuth, async (req, res) => {
  try {
    const application = await OfficerApplication.findOne({
      _id: req.params.id,
    });
    if (!application) {
      return res.status(404).send([{ message: "Application not found" }]);
    }
    await application.delete();
    res.send(application);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/officer/dues/:profileId", officerAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.profileId,
    }).populate("user", "role");
    if (profile.user.role !== "basic") {
      throw new Error("Cannot update");
    }
    profile.dues = req.body.dues;
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
