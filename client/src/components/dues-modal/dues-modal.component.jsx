import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormInput from "../form-input/form-input.component";

function UploadModal({ showModal, handleClose, handleSubmit, profile }) {
  const [dues, setDues] = useState(profile.dues);

  const onChange = (e) => {
    setDues(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit({ dues });
  };
  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Dues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="duesModal-Form" onSubmit={onSubmit}>
            <FormInput
              label="Dues"
              type="number"
              min="0.00"
              value={dues.toString()}
              onChange={onChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="duesModal-Form">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default UploadModal;
