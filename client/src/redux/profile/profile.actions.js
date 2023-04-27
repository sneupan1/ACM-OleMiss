import Axios from "axios";
import { setAlert } from "../alert/alert.actions";
import { ProfileActionTypes } from "./profile.types";
import moment from "moment";

const {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ID_START,
  FETCH_PROFILE_ID_SUCCESS,
  FETCH_ALL_PROFILES_START,
  FETCH_ALL_PROFILES_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_COMPLETE,
  UPDATE_DUES,
  SEND_OFFICER_APPLICATION,
  ACCOUNT_DELETE,
  ACCOUNT_DELETE_BY_ID,
  MAKE_ADMIN,
  PROFILE_ERROR,
  LOGOUT,
} = ProfileActionTypes;

const API_URL = process.env.API_URL || "";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: FETCH_PROFILE_START,
  });

  try {
    const res = await Axios.get(`${API_URL}/api/profile/me`);
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get profile by id
export const getProfileById = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_PROFILE_ID_START,
  });

  try {
    const res = await Axios.get(`${API_URL}/api/profile/${id}`);
    dispatch({
      type: FETCH_PROFILE_ID_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update profile
export const updateProfile = (profileForm, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  dispatch({
    type: UPDATE_PROFILE_START,
  });
  try {
    const res = await Axios.patch(`${API_URL}/api/profile/me`, profileForm, config);
    dispatch({
      type: UPDATE_PROFILE_COMPLETE,
      payload: res.data,
    });
    history.goBack();
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete Current User's profile, also deletes user's account
export const deleteProfile = (history) => async (dispatch) => {
  try {
    history.push("/");
    await Axios.delete(`${API_URL}/api/profile/me`);
    dispatch({
      type: ACCOUNT_DELETE,
    });
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteProfileById = (id, history) => async (dispatch) => {
  try {
    await Axios.delete(`${API_URL}/api/profile/${id}`);
    dispatch({
      type: ACCOUNT_DELETE_BY_ID,
    });
    history.push("/members");
    dispatch(setAlert("Account Deleted Successfully!", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update profile picture
export const uploadProfilePic = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const res = await Axios.post(`${API_URL}/api/profile/me/avatar`, formData, config);
    dispatch({
      type: UPDATE_PROFILE_COMPLETE,
      payload: res.data,
    });
    history.go(0);
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: FETCH_ALL_PROFILES_START,
  });

  try {
    const res = await Axios.get(`${API_URL}/api/profile/all`);
    dispatch({
      type: FETCH_ALL_PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update dues of members
export const updateMemberDues = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await Axios.patch(
      `${API_URL}/api/user/officer/dues/${id}`,
      formData,
      config
    );
    dispatch({ type: UPDATE_DUES, payload: res.data });
    dispatch(setAlert("Dues has been updated successfully", "success"));
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//send officer application
export const sendOfficerApplication = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await Axios.post(`${API_URL}/api/user/officer`, config);
    dispatch(setAlert("Application sent to admin", "success"));
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//make admin
export const makeAdmin = (id) => async (dispatch) => {
  try {
    const res = await Axios.patch(`${API_URL}/api/user/${id}/makeadmin`);
    dispatch({ type: MAKE_ADMIN, payload: res.data });
    dispatch(setAlert("Changed role to admin", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const downloadEmails = (profiles) => async (dispatch) => {
  var text = "";
  profiles.forEach((profile) => {
    text = text + profile.user.email + ";\n";
  });
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", "memberEmails");
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const downloadMembersInfo = (profiles) => async (dispatch) => {
  var csvContent =
    "Name, Email, Role, Dues, Classification, Major, Graduation" + "\n";

  profiles.forEach((profile) => {
    csvContent += `${profile.user.name} , ${profile.user.email}, ${
      profile.user.role
    }, ${profile.dues}, ${
      profile.classification ? profile.classification : ""
    }, ${profile.major ? profile.major : ""}, ${
      profile.graduationDate
        ? moment(profile.graduationDate).format("MMM YYYY")
        : ""
    }\n`;
  });
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
  );
  element.setAttribute("download", "membersInfo.csv");
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
