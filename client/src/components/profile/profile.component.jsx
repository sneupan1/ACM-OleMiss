import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "./profile.styles.scss";

import Moment from "react-moment";
import Image from "react-bootstrap/Image";
import { BsInfoCircle } from "react-icons/bs";
import { FaUserAlt, FaEdit } from "react-icons/fa";
import CustomModal from "../custom-modal/custom-modal.component";
import UploadModal from "../upload-modal/uploadModal.component";
import DuesModal from "../dues-modal/dues-modal.component";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  deleteProfile,
  uploadProfilePic,
  updateMemberDues,
  deleteProfileById,
  makeAdmin,
} from "../../redux/profile/profile.actions";

const Profile = ({
  passItem: profile,
  user,
  history,
  deleteProfile,
  deleteProfileById,
  uploadProfilePic,
  updateMemberDues,
  makeAdmin,
}) => {
  const toUpperCaseFilter = (d) => {
    return d.toUpperCase();
  };
  const API_URL = process.env.REACT_APP_API_URL || "";
  //modal for delete profile
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //modal for delete profile by id
  const [showByIdModal, setShowByIdModal] = useState(false);
  const handleByIdClose = () => setShowByIdModal(false);
  const handleByIdShow = () => setShowByIdModal(true);

  //modal for edit profile picture
  const [showDpModal, setShowDpModal] = useState(false);
  const handleDpClose = () => setShowDpModal(false);
  const handleDpShow = () => setShowDpModal(true);

  //modal for edit dues
  const [showDuesModal, setShowDuesModal] = useState(false);
  const handleDuesClose = () => setShowDuesModal(false);
  const handleDuesShow = () => setShowDuesModal(true);

  //modal for make admin feature
  const [showAdminModal, setShowAdminModal] = useState(false);
  const handleAdminClose = () => setShowAdminModal(false);
  const handleAdminShow = () => setShowAdminModal(true);

  const handleDeleteAction = () => {
    deleteProfile(history);
  };

  const handleDeleteByIdAction = () => {
    deleteProfileById(profile._id, history);
  };

  const handleDuesSubmit = (formData) => {
    updateMemberDues(profile._id, formData);
    handleDuesClose();
  };

  const handleMakeAdmin = () => {
    console.log("makingadmin");
    makeAdmin(profile.user._id);
    handleAdminClose();
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
      <CustomModal
        showModal={showByIdModal}
        handleClose={handleByIdClose}
        handleAction={handleDeleteByIdAction}
      >
        Are you sure you want to remove this user?
      </CustomModal>
      <CustomModal
        showModal={showAdminModal}
        handleClose={handleAdminClose}
        handleAction={handleMakeAdmin}
      >
        Are you sure you want to grant admin role to this user?
      </CustomModal>
      <UploadModal
        showModal={showDpModal}
        handleClose={handleDpClose}
        uploadIndex="avatar"
        handleSubmit={uploadProfilePic}
        history={history}
      />
      <DuesModal
        showModal={showDuesModal}
        handleClose={handleDuesClose}
        profile={profile}
        handleSubmit={handleDuesSubmit}
      />
      <div className="profileContainer">
        <div className="profileComponent">
          <div className="profileInfo-container">
            <div className="profile-img">
              {profile.avatar ? (
                <Image
                  className="dp-img"
                  src={`${API_URL}/api/profile/${profile._id}/avatar`}
                  roundedCircle
                />
              ) : (
                <div className="emptyPic-icon-container">
                  <FaUserAlt className="empty-icon" />
                </div>
              )}
              {profile.user._id === user._id && (
                <div className="profilePic-editicon">
                  <FaEdit onClick={handleDpShow} />
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
              <div className="role-badge">
                <h5>
                  <Badge pill variant="secondary">
                    {profile.user.role === "basic"
                      ? "MEMBER"
                      : profile.user.role.toUpperCase()}
                  </Badge>
                </h5>
              </div>
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
              {(profile.user.role === "basic" ||
                profile.user.role === "officer") &&
                (profile.user._id === user._id ||
                  user.role === "officer" ||
                  user.role === "admin") && (
                  <div className="basicInfo-fieldbox dues">
                    <span className="basicInfo-category dues">Dues</span>
                    <span className="basicInfo-value dues">{`$ ${profile.dues}`}</span>
                  </div>
                )}
              {profile.user.role === "basic" &&
                (user.role === "officer" || user.role === "admin") && (
                  <div className="profile-buttons">
                    <Button
                      id="edit-dues"
                      variant="info"
                      size="sm"
                      onClick={handleDuesShow}
                    >
                      Edit Dues
                    </Button>
                    {user.role === "admin" && (
                      <Button
                        className="deleteMember"
                        variant="success"
                        size="sm"
                        onClick={handleAdminShow}
                      >
                        Make Admin
                      </Button>
                    )}
                    <Button
                      className="deleteMember"
                      variant="danger"
                      size="sm"
                      onClick={handleByIdShow}
                    >
                      Delete User
                    </Button>
                  </div>
                )}

              {profile.user.role === "officer" &&
                (user.role === "admin" || user.role === "officer") && (
                  <div className="profile-buttons">
                    {profile.user._id !== user._id && (
                      <Button
                        id="edit-dues"
                        variant="info"
                        size="sm"
                        onClick={handleDuesShow}
                      >
                        Edit Dues
                      </Button>
                    )}
                    {user.role === "admin" && (
                      <Fragment>
                        <Button
                          className="deleteMember"
                          variant="success"
                          size="sm"
                          onClick={handleAdminShow}
                        >
                          Make Admin
                        </Button>
                        <Button
                          className="deleteMember"
                          variant="danger"
                          size="sm"
                          onClick={handleByIdShow}
                        >
                          Delete User
                        </Button>
                      </Fragment>
                    )}
                  </div>
                )}
              {profile.user._id === user._id && (
                <div className="profile-buttons">
                  {profile.user.role === "officer" && (
                    <Button
                      id="edit-dues"
                      variant="info"
                      size="sm"
                      onClick={handleDuesShow}
                    >
                      Edit Dues
                    </Button>
                  )}
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

export default connect(mapStateToProps, {
  deleteProfile,
  deleteProfileById,
  uploadProfilePic,
  updateMemberDues,
  makeAdmin,
})(Profile);
