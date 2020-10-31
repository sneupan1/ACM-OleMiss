import React, { useState } from "react";
import { connect } from "react-redux";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { createEvent } from "../../redux/event/event.actions";

import "./create-event.styles.scss";

const CreateEvent = ({ history, createEvent }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    venue: "",
    date: "",
    time: 0,
    price: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(form, history);
  };

  const { name, description, venue, date, time, price } = form;
  return (
    <div className="createEvent-container">
      <div className="createEvent-component">
        <h3 className="title">
          <FaUser /> Add an Event
        </h3>
        <form id="createEvent-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
            label="Event Name"
            required
          />
          <FormInput
            type="date"
            name="date"
            value={moment(date).format("YYYY-MM-DD")}
            handleChange={handleChange}
            label="Date of Event"
            required
          />
          <FormInput
            type="time"
            name="time"
            value={time.toString()}
            handleChange={handleChange}
            label="Time of Event"
            required
          />
          <FormInput
            type="text"
            name="venue"
            value={venue}
            handleChange={handleChange}
            label="Venue"
            required
          />
          <FormInput
            type="number"
            name="price"
            min="0"
            value={price}
            handleChange={handleChange}
            label="Price"
          />
          <FormInput
            type="textarea"
            name="description"
            value={description}
            handleChange={handleChange}
            label="Description"
            required
          />
        </form>
        <div className="createEvent-buttons">
          <CustomButton type="submit" form="createEvent-form">
            Create
          </CustomButton>
          <CustomButton variant="danger" onClick={() => history.goBack()}>
            Go Back
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createEvent })(CreateEvent);
