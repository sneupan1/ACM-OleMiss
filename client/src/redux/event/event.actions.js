import Axios from "axios";
import { setAlert } from "../../redux/alert/alert.actions";
import { eventActionTypes } from "./event.types";
const {
  CREATE_EVENT,
  FETCH_ALL_EVENTS_START,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_EVENT_ID_START,
  FETCH_EVENT_ID_SUCCESS,
  UPDATE_EVENT_START,
  UPDATE_EVENT_COMPLETE,
  UPDATE_FLYER_COMPLETE,
  JOIN_EVENT,
  CANCEL_EVENT,
  EVENT_DELETE,
  EVENT_ERROR,
} = eventActionTypes;

export const createEvent = (form, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await Axios.post("/api/event", form, config);
    dispatch({ type: CREATE_EVENT });
    history.goBack();
    setAlert("Event Added", "success");
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_EVENTS_START });
    const res = await Axios.get("/api/event/all");
    dispatch({ type: FETCH_ALL_EVENTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getEventById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENT_ID_START });
    const res = await Axios.get(`/api/event/${id}`);
    dispatch({ type: FETCH_EVENT_ID_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateFlyer = (form, history, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  try {
    const res = await Axios.post(`/api/event/${id}/flyer`, form, config);
    dispatch({
      type: UPDATE_FLYER_COMPLETE,
      payload: res.data,
    });
    history.go(0);
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

export const updateEvent = (eventForm, id, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  dispatch({
    type: UPDATE_EVENT_START,
  });
  try {
    const res = await Axios.patch(`/api/event/${id}`, eventForm, config);
    dispatch({
      type: UPDATE_EVENT_COMPLETE,
      payload: res.data,
    });
    history.goBack();
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEvent = (history, id) => async (dispatch) => {
  try {
    history.push("/");
    await Axios.delete(`/api/event/${id}`);
    dispatch({
      type: EVENT_DELETE,
    });
    dispatch(setAlert("Event Deleted Successfully!", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const joinEvent = (id) => async (dispatch) => {
  try {
    const res = await Axios.patch(`/api/event/${id}/register`);
    dispatch({ type: JOIN_EVENT, payload: res.data });
    dispatch(setAlert("You have been registered for this event.", "success"));
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

export const cancelEvent = (id) => async (dispatch) => {
  try {
    const res = await Axios.patch(`/api/event/${id}/unregister`);
    dispatch({ type: CANCEL_EVENT, payload: res.data });
    dispatch(setAlert("You have been removed from this event", "danger"));
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};
