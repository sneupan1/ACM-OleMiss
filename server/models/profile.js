const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classification: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    githubusername: {
      type: String,
      default: null,
    },
    dues: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
