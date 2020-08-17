import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

const initialState = [
  {
    token: localStorage.getItem("token"),
    loading: true,
    isAuthenticated: null,
    user: null,
  },
];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // localStorage.setItem("token", payload.token) nu inteleg ??????
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      // localStorage.removeItem("token"); nu inteleg ??????????
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case DELETE_ACCOUNT:
      // localStorage.removeItem("token"); nu inteleg ??????????
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
