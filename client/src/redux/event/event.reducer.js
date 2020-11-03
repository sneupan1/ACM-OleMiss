import { joinEvent } from "./event.actions";
import { eventActionTypes } from "./event.types";
const {
  CREATE_EVENT,
  FETCH_ALL_EVENTS_START,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_EVENT_ID_START,
  FETCH_EVENT_ID_SUCCESS,
  UPDATE_FLYER_START,
  UPDATE_FLYER_COMPLETE,
  UPDATE_EVENT_START,
  UPDATE_EVENT_COMPLETE,
  JOIN_EVENT,
  CANCEL_EVENT,
  REMOVE_PARTICIPANT,
  EVENT_DELETE,
  EVENT_ERROR,
} = eventActionTypes;

const INITIAL_STATE = {
  event: null,
  allEvents: null,
  isFetching: true,
  error: {},
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        isFetching: false,
      };
    case UPDATE_EVENT_START:
    case UPDATE_FLYER_START:
    case FETCH_EVENT_ID_START:
    case FETCH_ALL_EVENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: payload,
        isFetching: false,
      };
    case JOIN_EVENT:
    case CANCEL_EVENT:
    case UPDATE_EVENT_COMPLETE:
    case UPDATE_FLYER_COMPLETE:
    case FETCH_EVENT_ID_SUCCESS:
      return {
        ...state,
        event: payload,
        isFetching: false,
      };
    case REMOVE_PARTICIPANT:
      return {
        ...state,
        event: {
          ...state.event,
          participants: state.event.participants.filter(
            (participant) => participant.user._id !== payload
          ),
        },
        isFetching: false,
      };
    case EVENT_DELETE:
    case EVENT_ERROR: {
      return {
        ...state,
        error: payload,
        event: null,
        allEvents: null,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
