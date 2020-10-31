import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FaImage, FaEdit } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import UploadModal from "../upload-modal/uploadModal.component";
import CustomModal from "../custom-modal/custom-modal.component";
import AudienceModal from "../AudienceModal/audienceModal.component";
import moment from "moment";

import {
  updateFlyer,
  deleteEvent,
  joinEvent,
  cancelEvent,
} from "../../redux/event/event.actions";

import "./event.styles.scss";

const Event = ({
  passItem: event,
  role,
  user,
  isRegistered,
  history,
  updateFlyer,
  deleteEvent,
  joinEvent,
  cancelEvent,
}) => {
  //modal for edit flyer picture
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const handleFlyerClose = () => setShowFlyerModal(false);
  const handleFlyerShow = () => setShowFlyerModal(true);

  // modal for deleteing event
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //modal for signedUp users
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const handleAudienceClose = () => setShowAudienceModal(false);
  const handleAudienceShow = () => setShowAudienceModal(true);

  const handleDeleteAction = () => {
    deleteEvent(history, event._id);
  };

  return (
    <Fragment>
      <AudienceModal
        showModal={showAudienceModal}
        handleClose={handleAudienceClose}
        participants={event.participants}
      />
      <CustomModal
        showModal={showModal}
        handleClose={handleClose}
        handleAction={handleDeleteAction}
      >
        Are you sure you want to do this?
      </CustomModal>
      <UploadModal
        showModal={showFlyerModal}
        handleClose={handleFlyerClose}
        handleSubmit={updateFlyer}
        uploadIndex="flyer"
        history={history}
        id={event._id}
      />
      <div className="eventContainer">
        <div className="eventImage-Container">
          {event.flyer ? (
            <Image
              className="event-img"
              src={`${process.env.REACT_APP_SERVER_URL}/api/event/${event._id}/flyer`}
              fluid
              thumbnail
            />
          ) : (
            <div className="empty-flyer-container">
              <FaImage className="emptyFlyer-icon" />
            </div>
          )}
          {(role === "officer" || role === "admin") && (
            <div className="eventPic-editicon">
              <Button variant="info" size="sm" onClick={handleFlyerShow}>
                <FaEdit />
              </Button>
            </div>
          )}
        </div>
        <div className="eventInfo-container">
          <div className="dateContainer">
            <div className="monthContainer">
              {moment(event.date).format("MMM")}
            </div>
            <div className="dayContainer">{moment(event.date).format("D")}</div>
          </div>
          <div className="basicInfo-Container">
            <div className="dateTitle">
              {moment(event.date).format("ddd")} AT{" "}
              {moment(event.time, "hh:mm").format("h:mm a")}
            </div>
            <div className="eventTitle">{event.name}</div>
            <div className="venueTitle">
              {event.venue}
              {event.price && (
                <Fragment>
                  <span id="dashBackground"></span>${event.price} entry fee
                </Fragment>
              )}
            </div>
            {(role === "officer" || role === "admin") && (
              <div className="eventButtons officerButtons">
                <div>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => history.push(`/events/${event._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleShow}>
                    Delete
                  </Button>
                </div>
                <Button
                  id="viewParticipantsButton"
                  variant="primary"
                  size="sm"
                  onClick={handleAudienceShow}
                >
                  View Participants
                </Button>
              </div>
            )}
            {role === "basic" &&
              (isRegistered() ? (
                <div className="eventButtons joinCancel">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => cancelEvent(event._id)}
                  >
                    Leave Event
                  </Button>
                </div>
              ) : (
                <div className="eventButtons joinCancel">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => joinEvent(event._id)}
                  >
                    Join Event
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <div className="event-description">
          <h4 className="event-tag">
            <BsInfoCircle className="basic-info-icon" /> About this event
          </h4>
          <div className="description-data">{event.description}</div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  role: state.user.role,
  user: state.user.user,
  isRegistered: () =>
    ownProps.passItem.participants.find(
      (participant) =>
        participant.user === state.user.user._id ||
        participant.user._id === state.user.user._id
    ),
});

export default connect(mapStateToProps, {
  updateFlyer,
  deleteEvent,
  joinEvent,
  cancelEvent,
})(Event);
