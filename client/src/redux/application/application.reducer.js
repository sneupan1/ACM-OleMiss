import { applicationActionTypes } from "./application.types";

const {
  FETCH_ALL_APPLICATIONS_START,
  FETCH_ALL_APPLICATIONS_SUCCESS,
  NO_APPLICATIONS,
} = applicationActionTypes;

const INITIAL_STATE = {
  applications: null,
  isFetching: true,
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_APPLICATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case NO_APPLICATIONS:
    case FETCH_ALL_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: payload,
        isFetching: false,
      };
    default:
      return state;
  }
}
