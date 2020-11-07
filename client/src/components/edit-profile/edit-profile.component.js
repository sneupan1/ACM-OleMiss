import React, { useState } from "react";
import { connect } from "react-redux";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import "./edit-profile.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { updateProfile } from "../../redux/profile/profile.actions";

const EditProfile = ({ passItem: profile, history, updateProfile }) => {
  const [profileForm, setProfileForm] = useState({
    classification: profile.classification,
    graduationDate: profile.graduationDate,
    major: profile.major,
    bio: profile.bio,
    githubusername: profile.githubusername,
  });

  const {
    classification,
    graduationDate,
    major,
    bio,
    githubusername,
  } = profileForm;

  const handleChange = (event) => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  };

  const isFutureDate = (date) =>
    date.diff(moment(new Date())) > 0 ? true : false;

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm, history);
  };
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-component">
        <h3 className="title">
          <FaUser /> Edit Profile
        </h3>
        <form id="edit-profile-form" onSubmit={(e) => onSubmit(e)}>
          <FormInput
            type="select"
            inputOptions={[
              "Undergraduate",
              "Graduate",
              "Faculty Member",
              "Instructor",
            ]}
            name="classification"
            value={classification}
            handleChange={handleChange}
            label="Classification"
          />
          <FormInput
            type="date"
            name="graduationDate"
            value={
              isFutureDate(moment(graduationDate))
                ? moment(graduationDate).format("YYYY-MM-DD")
                : moment("").format("YYYY-MM-DD")
            }
            handleChange={handleChange}
            label="Graduation Date"
          />
          <FormInput
            type="text"
            name="major"
            value={major}
            handleChange={handleChange}
            label="Major"
          />
          <FormInput
            type="text"
            name="githubusername"
            value={githubusername}
            handleChange={handleChange}
            label="Github Username"
          />
          <FormInput
            type="textarea"
            name="bio"
            value={bio}
            handleChange={handleChange}
            label="Write Something About Yourself"
          />
        </form>
        <div className="editProfile-buttons">
          <CustomButton type="submit" form="edit-profile-form">
            Save
          </CustomButton>
          <CustomButton variant="danger" onClick={() => history.goBack()}>
            Go Back
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updateProfile })(EditProfile);
