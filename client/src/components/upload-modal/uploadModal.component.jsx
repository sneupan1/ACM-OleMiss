import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UploadModal({
  showModal,
  handleClose,
  handleSubmit,
  uploadIndex,
  history,
}) {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");

  const [warning, setWarning] = useState("");

  const onChange = (e) => {
    if (!(e.target.files[0].size <= 2000000)) {
      setWarning("File size should be less than 2 MB");
    } else if (
      !e.target.files[0].name.toLowerCase().match(/\.(jpg|jpeg|png)$/)
    ) {
      setWarning("Please upload jpeg, jpg or png file only");
    } else {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
      setWarning("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(uploadIndex, file);
    handleSubmit(formData, history);
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
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="uploadModal-Form" onSubmit={onSubmit}>
            <Form.File
              id="custom-file"
              label={filename ? filename : `Choose File`}
              onChange={onChange}
              custom
            />
            <p style={{ fontSize: "small" }}>{warning}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="uploadModal-Form">
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default UploadModal;
