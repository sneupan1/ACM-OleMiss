import { applicationActionTypes } from "./application.types";

const {
  FETCH_ALL_APPLICATIONS_START,
  FETCH_ALL_APPLICATIONS_SUCCESS,
  APPROVE_APPLICATION,
  REJECT_APPLICATION,
  NO_APPLICATIONS,
} = applicationActionTypes;

const INITIAL_STATE = {
  applications: null,
  isFetching: true,
  errors: {},
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_APPLICATIONS_START:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_ALL_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: payload,
        isFetching: false,
      };
    case REJECT_APPLICATION:
    case APPROVE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(
          (application) => application._id !== payload
        ),
        isFetching: false,
      };
    case NO_APPLICATIONS:
      return {
        ...state,
        errors: payload,
        isFetching: null,
        applications: null,
      };
    default:
      return state;
  }
}
