const mongoose = require("mongoose");

const officerApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const OfficerApplication = mongoose.model(
  "OfficerApplication",
  officerApplicationSchema
);

module.exports = OfficerApplication;
