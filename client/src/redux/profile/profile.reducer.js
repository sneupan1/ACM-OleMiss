import { ProfileActionTypes } from "./profile.types";

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
  PROFILE_ERROR,
} = ProfileActionTypes;

const INITIAL_STATE = {
  profile: null,
  profileById: null,
  allProfiles: [],
  error: {},
  isFetching: true,
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILE_START:
    case FETCH_PROFILE_ID_START:
    case FETCH_ALL_PROFILES_START:
    case UPDATE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROFILE_SUCCESS:
    case UPDATE_PROFILE_COMPLETE:
      return {
        ...state,
        profile: payload,
        isFetching: false,
      };
    case FETCH_ALL_PROFILES_SUCCESS:
      return {
        ...state,
        allProfiles: payload,
        isFetching: false,
      };
    case FETCH_PROFILE_ID_SUCCESS:
      return {
        ...state,
        profileById: payload,
        isFetching: false,
      };
    case UPDATE_DUES:
      return {
        ...state,
        profileById: payload,
        isFetching: false,
      };
    case PROFILE_ERROR:
    case ACCOUNT_DELETE:
    case ACCOUNT_DELETE_BY_ID:
      return {
        ...state,
        error: payload,
        isFetching: false,
        profile: null,
        profileById: null,
        allProfiles: null,
      };
    case "clearfetch":
      return {
        ...state,
        allProfiles: null,
        isFetching: true,
      };
    default:
      return state;
  }
}
