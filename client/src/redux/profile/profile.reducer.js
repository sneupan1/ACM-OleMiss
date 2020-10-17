import { ProfileActionTypes } from "./profile.types";

const {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_COMPLETE,
  ACCOUNT_DELETE,
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
    case UPDATE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROFILE_SUCCESS:
    case UPDATE_PROFILE_COMPLETE:
      return {
        ...state,
        isFetching: false,
        profile: payload,
      };

    case PROFILE_ERROR:
    case ACCOUNT_DELETE:
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
