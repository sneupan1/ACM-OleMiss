import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MemberCard from "../member-card/memberCard.component";
import {
  sendOfficerApplication,
  downloadEmails,
  downloadMembersInfo,
} from "../../redux/profile/profile.actions";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./member-card-collections.styles.scss";
import DownloadModal from "../download-Modal/downloadModal.component";

const MemberCollection = ({
  passItem: profiles,
  sendOfficerApplication,
  downloadEmails,
  downloadMembersInfo,
  role,
}) => {
  //for tools (download) modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [apply, setApply] = useState({
    text: "Apply for Officer Account",
    status: false,
  });

  const [searchValue, setSearchValue] = useState("");

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleApply = () => {
    setApply({ text: "Waiting for Admin Approval", status: true });
    sendOfficerApplication();
  };

  return (
    <Fragment>
      <DownloadModal
        showModal={showModal}
        handleClose={handleClose}
        downloadEmails={downloadEmails}
        downloadMembersInfo={downloadMembersInfo}
        profiles={profiles}
      />
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
        {(role === "officer" || role === "admin") && (
          <div className="appButton">
            <Button variant="info" size="sm" onClick={handleShow}>
              Tools
            </Button>
          </div>
        )}
      </div>
      <InputGroup size="sm" className="mb-3 searchBar">
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search"
          onChange={handleOnChange}
          value={searchValue}
        />
      </InputGroup>
      {profiles
        .filter((profile) =>
          profile.user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((profile) => (
          <MemberCard key={profile._id} profile={profile} />
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.user.role,
});

export default connect(mapStateToProps, {
  sendOfficerApplication,
  downloadEmails,
  downloadMembersInfo,
})(MemberCollection);
