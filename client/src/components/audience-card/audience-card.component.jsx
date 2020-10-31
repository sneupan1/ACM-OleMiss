import React from "react";
import Button from "react-bootstrap/Button";
import { FaUserAlt } from "react-icons/fa";
import Image from "react-bootstrap/Image";

import "./audience-card.styles.scss";

const AudienceCard = ({ participant }) => {
  return (
    <div className="audienceCardContainer">
      <div className="audienceComponent">
        <div className="audiencePicAndInfo-container">
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
          <Button variant="info" size="sm">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudienceCard;
