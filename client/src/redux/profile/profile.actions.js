import Axios from "axios";
import { setAlert } from "../alert/alert.actions";
import { ProfileActionTypes } from "./profile.types";

const {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_COMPLETE,
  ACCOUNT_DELETE,
  PROFILE_ERROR,
  LOGOUT,
} = ProfileActionTypes;

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: FETCH_PROFILE_START,
  });

  try {
    const res = await Axios.get("/api/profile/me");
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
    const res = await Axios.patch("/api/profile/me", profileForm, config);
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
    await Axios.delete("/api/profile/me");
    dispatch({
      type: ACCOUNT_DELETE,
    });
    dispatch({ type: LOGOUT });
    dispatch(setAlert("Account Deleted Successfully!", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
