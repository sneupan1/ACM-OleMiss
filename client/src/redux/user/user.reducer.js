import { UserActionTypes } from "./user.types";
const {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOAD_USER,
  LOGOUT,
  AUTH_ERROR,
} = UserActionTypes;

const INITIAL_STATE = {
  token: null,
  user: null,
  role: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        role: payload.user.role,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        role: payload.role,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        loading: false,
      };
    default:
      return state;
  }
};
