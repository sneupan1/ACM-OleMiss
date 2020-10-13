import AlertActionTypes from "./alert.types";

const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT:
      state = state.filter((alert) => alert.msg !== action.payload.msg);
      return [...state, action.payload];
    case AlertActionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
