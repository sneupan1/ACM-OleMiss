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
      default: "",
    },
    graduationDate: {
      type: Date,
      default: null,
    },
    major: {
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

  if (profileObject.avatar) {
    profileObject.avatar = true;
  } else {
    profileObject.avatar = false;
  }

  if (!profileObject.dues) {
    profileObject.dues = 0;
  }

  return profileObject;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
