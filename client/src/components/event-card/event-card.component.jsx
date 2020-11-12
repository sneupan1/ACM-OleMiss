import React from "react";
import Image from "react-bootstrap/Image";
import { FaImage } from "react-icons/fa";
import moment from "moment";

import "./event-card.styles.scss";

const EventCard = ({ event, history }) => {
  return (
    <div
      className="eventCard"
      onClick={() => history.push(`/events/${event._id}`)}
    >
      <div className="events-image-container">
        {event.flyer ? (
          <Image variant="top" src={`/api/event/${event._id}/flyer`} fluid />
        ) : (
          <FaImage className="card-img-top emptyFlyerEvents-icon" />
        )}
      </div>

      <div className="eventInfo">
        <div className="eventTitle">{event.name}</div>
        <div className="eventDate">
          {moment(event.date).format("ddd, MMM Do YYYY")}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
