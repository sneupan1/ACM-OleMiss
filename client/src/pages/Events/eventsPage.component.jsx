import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./eventsPage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import EventCollection from "../../components/event-card-collections/event-card-collections";
import { setTokenInHeader } from "../../redux/user/user.utils";

// import MemberCollection from "../../components/member-card-collections/member-card-collections";

import { getAllEvents } from "../../redux/event/event.actions";

const EventCollectionWithSpinner = WithSpinner(EventCollection);

//          MemberCollectionWithSpinner
//     passItem={profiles}
//     isFetching={isFetching}
//   />

const EventsPage = ({ token, events, getAllEvents, isFetching }) => {
  useEffect(() => {
    setTokenInHeader(token);
    getAllEvents();
  }, [getAllEvents, token]);

  return (
    <div className="eventsPage">
      <EventCollectionWithSpinner passItem={events} isFetching={isFetching} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.allEvents,
  isFetching: state.event.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getAllEvents })(EventsPage);
