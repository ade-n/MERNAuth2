import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  UPDATE_EXPERIENCE,
  UPDATE_EDUCATION,
} from "../actions/types";

const initialState = {
  profile: null,
  loading: true,
  profiles: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case UPDATE_EXPERIENCE:
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: state.profile.experience.filter(
            (exp) => exp._id !== payload
          ),
        },
        loading: false,
      };
    case UPDATE_EDUCATION:
      return {
        ...state,
        profile: {
          ...state.profile,
          education: state.profile.education.filter(
            (edu) => edu._id !== payload
          ),
        },
        loading: false,
      };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload, profile: null };
    case CLEAR_PROFILE:
      return { ...state, profile: null };
    default:
      return state;
  }
}
