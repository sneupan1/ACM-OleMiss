import React from "react";
import { connect } from "react-redux";

import AlertBox from "./alertBox.component";

const Alert = ({ alerts }) =>
  alerts &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertBox key={alert.id} alertType={alert.alertType} msg={alert.msg} />
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
