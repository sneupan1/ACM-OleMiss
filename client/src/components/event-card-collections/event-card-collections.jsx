import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/button";
import moment from "moment";
import "./event-card-styles.scss";

import EventCard from "../event-card/event-card.component";

const EventCollection = ({ passItem: events, role, history }) => {
  const isFutureDate = (date) => {
    return date.diff(moment(new Date()), "days") >= 0 ? true : false;
  };

  return (
    <Fragment>
      <div className="eventPage-titleBox">
        <div id="eventPage-title">Events</div>
        {(role === "officer" || role === "admin") && (
          <div className="appButton">
            <Button
              variant="info"
              size="sm"
              onClick={() => {
                history.push("/events/create");
              }}
            >
              Add an event
            </Button>
          </div>
        )}
      </div>
      <div className="event-cards-container">
        {events
          .filter((event) => isFutureDate(moment(event.date)))
          .map((event) => (
            <EventCard key={event._id} event={event} history={history} />
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.user.role,
});

export default connect(mapStateToProps)(withRouter(EventCollection));
