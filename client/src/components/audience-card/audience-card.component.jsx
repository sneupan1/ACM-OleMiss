import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { FaUserAlt } from "react-icons/fa";
import Image from "react-bootstrap/Image";

import { removeParticipant } from "../../redux/event/event.actions";

import "./audience-card.styles.scss";

const AudienceCard = ({ participant, history, removeParticipant, eventId }) => {
  return (
    <div className="audienceCardContainer">
      <div className="audienceComponent">
        <div
          className="audiencePicAndInfo-container"
          onClick={() => history.push(`/members/${participant.profile._id}`)}
        >
          <div className="audiencePicContainer">
            {participant.profile.avatar ? (
              <Image
                className="dp-img"
                src={`${process.env.REACT_APP_SERVER_URL}/api/profile/${participant.profile._id}/avatar`}
                roundedCircle
              />
            ) : (
              <div className="audienceempty-icon-box">
                <FaUserAlt className="audienceempty-icon" />
              </div>
            )}
          </div>
          <div className="audienceInfo">
            <div className="audienceInfo-name">{participant.user.name}</div>
          </div>
        </div>
        <div className="audienceButton">
          <Button
            variant="info"
            size="sm"
            onClick={() => removeParticipant(eventId, participant.user._id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventId: state.event.event._id,
});

export default connect(mapStateToProps, { removeParticipant })(AudienceCard);
