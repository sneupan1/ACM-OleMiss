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
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.methods.toJSON = function () {
  const profile = this;
  const profileObject = profile.toObject();

  delete profileObject.avatar;

  return profileObject;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
