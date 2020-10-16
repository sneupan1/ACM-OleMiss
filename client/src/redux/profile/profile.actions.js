import Axios from "axios";
import { ProfileActionTypes } from "./profile.types";

const {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  PROFILE_ERROR,
} = ProfileActionTypes;

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
