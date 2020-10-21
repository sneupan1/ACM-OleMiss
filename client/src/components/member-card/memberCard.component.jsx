import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./memberCard.styles.scss";

import Image from "react-bootstrap/Image";
import { FaUserAlt } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";

const MemberCard = ({ profile, history }) => {
  return (
    <div
      className="memberContainer"
      onClick={() => {
        history.push(`/members/${profile._id}`);
      }}
    >
      <div className="memberComponent">
        <div className="memberPicAndInfo-container">
          <div className="memberPicContainer">
            {profile.avatar ? (
              <Image
                className="dp-img"
                src={`${process.env.REACT_APP_SERVER_URL}/api/profile/${profile._id}/avatar`}
                roundedCircle
              />
            ) : (
              <div className="memberempty-icon-box">
                <FaUserAlt className="memberempty-icon" />
              </div>
            )}
          </div>
          <div className="memberInfo">
            <div className="memberInfo-name">{profile.user.name}</div>
            <div className="memberInfo-email">{profile.user.email}</div>
            <div className="memberInfo-details">
              {profile.classification && (
                <Fragment>{profile.classification}</Fragment>
              )}
              {profile.major && (
                <Fragment>
                  <span className="dashBackground"></span> {profile.major}
                </Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="role-badge">
          <h5>
            <Badge pill variant="secondary">
              {profile.user.role === "basic"
                ? "MEMBER"
                : profile.user.role.toUpperCase()}
            </Badge>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MemberCard);
