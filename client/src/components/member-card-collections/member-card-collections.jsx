import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MemberCard from "../member-card/memberCard.component";
import { sendOfficerApplication } from "../../redux/profile/profile.actions";
import "./member-card-collections.styles.scss";

const MemberCollection = ({
  passItem: profiles,
  sendOfficerApplication,
  role,
}) => {
  const [apply, setApply] = useState({
    text: "Apply for Officer Account",
    status: false,
  });

  const handleApply = () => {
    setApply({ text: "Waiting for Admin Approval", status: true });
    sendOfficerApplication();
  };

  return (
    <Fragment>
      <div className="memberPage-titleBox">
        <div id="memberPage-title">Members</div>
        {role === "basic" && (
          <div className="appButton">
            <Button
              variant="info"
              size="sm"
              onClick={handleApply}
              active={apply.status ? true : false}
            >
              {apply.text}
            </Button>
          </div>
        )}
      </div>
      {profiles.map((profile) => (
        <MemberCard key={profile._id} profile={profile} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.user.role,
});

export default connect(mapStateToProps, { sendOfficerApplication })(
  MemberCollection
);
