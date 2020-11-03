import React, { useState } from "react";
import { connect } from "react-redux";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { updateEvent } from "../../redux/event/event.actions";

import "./edit-event.styles.scss";

const EditEvent = ({ history, updateEvent, passItem: event }) => {
  const [form, setForm] = useState({
    name: event.name,
    description: event.description,
    venue: event.venue,
    date: event.date,
    time: event.time,
    price: event.price,
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(form, event._id, history);
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
            value={price.toString()}
            handleChange={handleChange}
            label="Price (optional)"
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
            Save
          </CustomButton>
          <CustomButton variant="danger" onClick={() => history.goBack()}>
            Go Back
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updateEvent })(EditEvent);
