import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.styles.scss";

import Moment from "react-moment";
import Image from "react-bootstrap/Image";
import { BsInfoCircle } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import CustomModal from "../custom-modal/custom-modal.component";
import Button from "react-bootstrap/Button";

import { deleteProfile } from "../../redux/profile/profile.actions";

const Profile = ({ profile, user, history, deleteProfile }) => {
  const toUpperCaseFilter = (d) => {
    return d.toUpperCase();
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDeleteAction = () => {
    deleteProfile(history);
  };
  return (
    <Fragment>
      <CustomModal
        showModal={showModal}
        handleClose={handleClose}
        handleAction={handleDeleteAction}
      >
        Are you sure you want to do this?
      </CustomModal>
      <div className="profileContainer">
        <div className="profileComponent">
          <div className="profileInfo-container">
            <div className="profile-img">
              {profile.avatar ? (
                <Image
                  className="dp-img"
                  src={`${process.env.REACT_APP_SERVER_URL}/api/profile/${profile._id}/avatar`}
                  roundedCircle
                />
              ) : (
                <div className="emptyPic-icon-container">
                  <FaUserAlt className="empty-icon" />
                </div>
              )}
            </div>
            <div className="profile-basicInfo">
              <h1 className="profile-name">{profile.user.name}</h1>
              <span>
                UNIVERSITY OF MISSISSIPPI
                {profile.classification && (
                  <Fragment>
                    <span id="dashBackground"></span>
                    {profile.classification.toUpperCase()}
                  </Fragment>
                )}
              </span>
              {profile.graduationDate && (
                <span>
                  {" "}
                  <Moment
                    filter={toUpperCaseFilter}
                    format="MMM YYYY"
                    withTitle
                  >
                    {profile.graduationDate}
                  </Moment>{" "}
                  GRADUATION
                </span>
              )}
              <h4 className="profile-basic-tag">
                <BsInfoCircle className="basic-info-icon" /> Basic Info
              </h4>
              {profile.major && (
                <div className="basicInfo-fieldbox">
                  <span className="basicInfo-category">Major</span>
                  <span className="basicInfo-value major">{profile.major}</span>
                </div>
              )}
              <div className="basicInfo-fieldbox">
                <span className="basicInfo-category">Email</span>
                <span className="basicInfo-value">{profile.user.email}</span>
              </div>
              {profile.githubusername && (
                <div className="basicInfo-fieldbox">
                  <span className="basicInfo-category">Github</span>
                  <span className="basicInfo-value">
                    github.com/{`${profile.githubusername}`}
                  </span>
                </div>
              )}
              <div className="basicInfo-fieldbox dues">
                <span className="basicInfo-category dues">Dues</span>
                <span className="basicInfo-value dues">{`$ ${profile.dues}`}</span>
              </div>
              {profile.user._id === user._id && (
                <div className="profile-buttons">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => history.push("/profile/me/edit")}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleShow}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
          {profile.bio && (
            <div className="profile-aboutMe">
              <h4 className="profile-tag">
                <BsInfoCircle className="basic-info-icon" /> About Me
              </h4>
              <div className="aboutMe-data">{profile.bio}</div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { deleteProfile })(Profile);
