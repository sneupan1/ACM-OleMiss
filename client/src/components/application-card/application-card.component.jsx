import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./application-card.styles.scss";

import {
  approveApplication,
  rejectApplication,
} from "../../redux/application/application.actions";
import Image from "react-bootstrap/Image";
import { FaUserAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const ApplicationCard = ({
  application,
  history,
  approveApplication,
  rejectApplication,
}) => {
  return (
    <div className="applicationContainer">
      <div className="applicationComponent">
        <div className="applicationPicAndInfo-container">
          <div className="applicationPicContainer">
            {application.profile.avatar ? (
              <Image
                className="dp-img"
                src={`/api/profile/${application.profile._id}/avatar`}
                roundedCircle
              />
            ) : (
              <div className="applicationempty-icon-box">
                <FaUserAlt className="applicationempty-icon" />
              </div>
            )}
          </div>
          <div className="applicationInfo">
            <div
              className="applicationInfo-name"
              onClick={() =>
                history.push(`/members/${application.profile._id}`)
              }
            >
              {application.user.name}
            </div>
            <div className="applicationInfo-email">
              {application.user.email}
            </div>
          </div>
        </div>
        <div className="applcationButtons-Box">
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              approveApplication(application._id);
            }}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              rejectApplication(application._id);
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { approveApplication, rejectApplication })(
  withRouter(ApplicationCard)
);
