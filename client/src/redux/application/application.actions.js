import Axios from "axios";
import { applicationActionTypes } from "./application.types";

const {
  FETCH_ALL_APPLICATIONS_START,
  FETCH_ALL_APPLICATIONS_SUCCESS,
  NO_APPLICATIONS,
} = applicationActionTypes;

//fetch all applications
export const getAllApplications = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_APPLICATIONS_START });
    const res = await Axios.get("/api/user/officer/applications");
    dispatch({ type: FETCH_ALL_APPLICATIONS_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data;
    dispatch({ type: NO_APPLICATIONS, payload: errors[0].message });
  }
};
