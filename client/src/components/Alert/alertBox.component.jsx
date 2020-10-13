import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./alert.styles.scss";

const AlertBox = ({ alertType, msg }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (msg) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }, [msg]);

  return (
    <Alert
      show={show}
      className="alertBox"
      variant={alertType}
      onClose={() => setShow(false)}
      dismissible
    >
      {msg}
    </Alert>
  );
};

export default AlertBox;
