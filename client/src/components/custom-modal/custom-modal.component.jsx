import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CustomModal({ showModal, handleClose, handleAction, children }) {
  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default CustomModal;
