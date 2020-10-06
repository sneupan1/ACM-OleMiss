const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const officerAuth = require("../middleware/officerAuth");

//  @route      POST api/event/
//  @desc       create event
//  @access     private, needs to be admin or officer
router.post("/", officerAuth, async (req, res) => {
  try {
    if (req.body.participants) {
      delete req.body.participants;
    }
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      POST api/event/all
//  @desc       get all events
//  @access     private
router.get("/all", auth, async (req, res) => {
  try {
    const events = await Event.find().populate("participants.user", [
      "name",
      "email",
    ]);
    if (events.length === 0) {
      return res.status(404).send([{ message: "There are no events for now" }]);
    }
    res.send(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      POST api/event/:id
//  @desc       get all events
//  @access     private
router.get("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.eventId,
    }).populate("participants.user", ["name", "email"]);
    res.send(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      PATCH api/event/:id
//  @desc       edit event details by officers
//  @access     private, needs to be admin or officer
router.patch("/:eventId", officerAuth, async (req, res) => {
  try {
    if (req.body.participants) {
      delete req.body.participants;
    }
    const event = await Event.findOneAndUpdate(
      { _id: req.params.eventId },
      req.body,
      { new: true }
    );
    res.send(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      PATCH api/event/:id/register
//  @desc       register for event
//  @access     private
router.patch("/:eventId/register", auth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId });
    if (
      event.participants.find(
        (participant) => participant.user.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .send([{ message: "You have already registered for this event." }]);
    }
    event.participants = event.participants.concat({ user: req.user._id });
    await event.save();
    res.send([{ message: "Registered for the event" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      PATCH api/event/:id/user/:id
//  @desc       remove user from event
//  @access     private, must be an officer or admin
router.patch("/:eventId/user/:userId", officerAuth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId });
    event.participants = event.participants.filter(
      (participant) => participant.user.toString() !== req.params.userId
    );
    await event.save();
    res.send([{ message: "Removed from event" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      PATCH api/event/:id/unregister
//  @desc       unregister from event
//  @access     private
router.patch("/:eventId/unregister", auth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId });
    event.participants = event.participants.filter(
      (participant) => participant.user.toString() !== req.user.id
    );
    await event.save();
    res.send([{ message: "Removed from event" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  @route      DELETE api/event/:id
//  @desc       DELETE event by id
//  @access     private, must be officer or admin
router.delete("/:eventId", officerAuth, async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.eventId });
    res.send([{ message: "Event has been removed" }]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//trying file upload
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload jpeg, jpg or png file only"));
    }
    cb(undefined, true);
  },
});

//  @route      POST api/event/:id/flyer
//  @desc       add flyer to event
//  @access     Private
router.post(
  "/:id/flyer",
  officerAuth,
  upload.single("flyer"),
  async (req, res) => {
    const event = await Event.findOne({
      _id: req.params.id,
    }).populate("participants.user", ["name", "email"]);
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .png()
      .toBuffer();
    event.flyer = buffer;
    await event.save();
    res.send(event);
  },
  (err, req, res, next) => {
    res.status(400).send([{ message: err.message }]);
  }
);

//  @route      DELETE api/event/:id/flyer
//  @desc       DELETE flyer from event by id
//  @access     Private
router.delete("/:id/flyer", officerAuth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
    }).populate("participants.user", ["name", "email"]);
    if (!event) {
      console.log("event is empty");
    }
    event.flyer = undefined;
    await event.save();
    res.send(event);
  } catch (err) {
    res.status(400).send([{ message: err.message }]);
  }
});

//  @route      GET api/event/:id/flyer
//  @desc       FETCH flyer using event :ID
//  @access     public
router.get("/:id/flyer", async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
    }).populate("participants.user", ["name", "email"]);

    if (!event.flyer) {
      throw new Error("Flyer not found");
    }
    res.set("Content-Type", "image/png");
    res.send(event.flyer);
  } catch (err) {
    res.status(400).send([{ message: err.message }]);
  }
});

module.exports = router;
