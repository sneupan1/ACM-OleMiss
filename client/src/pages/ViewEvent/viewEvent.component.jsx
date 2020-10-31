import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./viewEvent.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Event from "../../components/event/event.component";
import { setTokenInHeader } from "../../redux/user/user.utils";
import { getEventById } from "../../redux/event/event.actions";

const EventWithSpinner = WithSpinner(Event);

const ViewEvent = ({
  match,
  token,
  isFetching,
  event,
  getEventById,
  history,
}) => {
  useEffect(() => {
    setTokenInHeader(token);
    getEventById(match.params.id);
  }, [token, getEventById, match.params.id]);

  return (
    <div className="viewEventPage">
      <EventWithSpinner
        passItem={event}
        isFetching={isFetching}
        history={history}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
  isFetching: state.event.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getEventById })(ViewEvent);
