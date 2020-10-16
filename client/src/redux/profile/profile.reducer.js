import { ProfileActionTypes } from "./profile.types";

const {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  PROFILE_ERROR,
} = ProfileActionTypes;

const INITIAL_STATE = {
  profile: null,
  profileById: null,
  profiles: [],
  error: {},
  isFetching: true,
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        err: payload,
        isFetching: false,
        profile: null,
        profileById: null,
      };
    default:
      return state;
  }
}
