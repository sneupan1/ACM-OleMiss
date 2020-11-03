import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AudienceCard from "../audience-card/audience-card.component";

import "./audienceModal.styles.scss";

function AudienceModal({ showModal, handleClose, participants, history }) {
  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="audienceModalDialog" closeButton>
          <Modal.Title>Users registered for the event</Modal.Title>
        </Modal.Header>
        <Modal.Body className="audienceModalDialog modalBody">
          {participants.map((participant) => (
            <AudienceCard
              key={participant._id}
              participant={participant}
              history={history}
            />
          ))}
        </Modal.Body>
        <Modal.Footer className="audienceModalDialog">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AudienceModal;
