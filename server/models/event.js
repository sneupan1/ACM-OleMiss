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
    },
  ],
});

eventSchema.methods.toJSON = function () {
  const event = this;
  const eventObject = event.toObject();

  delete eventObject.flyer;

  return eventObject;
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
