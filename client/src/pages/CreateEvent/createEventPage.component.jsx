import React from "react";
import "./createEventPage.styles.scss";

import CreateEvent from "../../components/create-event/create-event.component";

const CreateEventPage = ({ history }) => {
  return (
    <div className="createEventPage">
      <CreateEvent history={history} />
    </div>
  );
};

export default CreateEventPage;
