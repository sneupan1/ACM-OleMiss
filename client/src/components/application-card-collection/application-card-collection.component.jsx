import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import ApplicationCard from "../application-card/application-card.component";
import "./application-card-collection.styles.scss";

const ApplicationCollection = ({ passItem: applications }) => {
  return (
    <Fragment>
      <div className="applicationPage-titleBox">
        <div id="applicationPage-title">
          {applications.length === 0
            ? "No Applications Right Now"
            : "Officer Applications"}
        </div>
      </div>

      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </Fragment>
  );
};

export default connect(null)(ApplicationCollection);
