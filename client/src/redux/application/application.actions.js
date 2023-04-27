import Axios from "axios";
import { applicationActionTypes } from "./application.types";
import { setAlert } from "../alert/alert.actions";

const {
  FETCH_ALL_APPLICATIONS_START,
  FETCH_ALL_APPLICATIONS_SUCCESS,
  APPROVE_APPLICATION,
  REJECT_APPLICATION,
  NO_APPLICATIONS,
} = applicationActionTypes;

const API_URL = process.env.API_URL || "";

//fetch all applications
export const getAllApplications = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_APPLICATIONS_START });
    const res = await Axios.get(`${API_URL}/api/user/officer/applications`);
    dispatch({ type: FETCH_ALL_APPLICATIONS_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data;
    dispatch({ type: NO_APPLICATIONS, payload: errors[0].message });
  }
};

//approve officer application by id
export const approveApplication = (id) => async (dispatch) => {
  try {
    const res = await Axios.patch(`${API_URL}/api/user/officer/application/${id}`);
    dispatch({ type: APPROVE_APPLICATION, payload: id });
    dispatch(setAlert("Application approved", "success"));
  } catch (err) {
    dispatch({
      type: NO_APPLICATIONS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//reject officer application by id
export const rejectApplication = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`${API_URL}/api/user/officer/application/${id}`);
    dispatch({ type: REJECT_APPLICATION, payload: id });
    dispatch(setAlert("Application rejected", "warning"));
  } catch (err) {
    dispatch({
      type: NO_APPLICATIONS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
