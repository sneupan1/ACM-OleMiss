const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  flyer: {
    type: Buffer,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    },
  ],
});

eventSchema.methods.toJSON = function () {
  const event = this;
  const eventObject = event.toObject();

  if (!eventObject.price) {
    eventObject.price = "";
  }

  if (eventObject.flyer) {
    eventObject.flyer = true;
  } else {
    eventObject.flyer = false;
  }

  return eventObject;
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
