import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function DownloadModal({
  showModal,
  handleClose,
  downloadEmails,
  downloadMembersInfo,
  profiles,
}) {
  const [emails, setEmails] = useState(false);
  const [info, setInfo] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    emails && downloadEmails(profiles);
    info && downloadMembersInfo(profiles);
    handleClose();
    setEmails(false);
    setInfo(false);
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
          <Modal.Title>Tools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="downloadModal-Form" onSubmit={onSubmit}>
            <Form.Check
              type="checkbox"
              name="emails"
              value={emails}
              onChange={() => {
                setEmails(!emails);
              }}
              label={`Download all emails`}
            />
            <Form.Check
              type="checkbox"
              name="info"
              value={info}
              onChange={() => {
                setInfo(!info);
              }}
              label={`Download members information`}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="downloadModal-Form">
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default DownloadModal;
