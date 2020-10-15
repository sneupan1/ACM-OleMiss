import Axios from "axios";
import { UserActionTypes } from "./user.types";
import { setAlert } from "../alert/alert.actions";

const {
  REGISTER_SUCCESS,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
} = UserActionTypes;

//Register User
export const signupUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await Axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//register admin
export const signupAdmin = (name, email, password, key) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, key });

  try {
    const res = await Axios.post("/api/user/admin", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await Axios.post("/api/user/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/user/me");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await Axios.post("/api/user/logout");
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    const errors = err.response.data;
    errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
  }
};
