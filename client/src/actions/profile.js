import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  UPDATE_EXPERIENCE,
  UPDATE_EDUCATION,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//get user profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get user profiles
export const getProfiles = () => async (dispatch) => {
  // dispatch({
  //   type: CLEAR_PROFILE,
  // });
  try {
    const res = await axios.get("/api/profiles");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get user profile by Id
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create and update profile
export const addProfile = (formData, history, edit = false, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profiles", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? "Profile updated"
          : "!!! Congratulation, profile was created successfully !!!",
        "green"
      )
    );

    if (!edit) {
      history.push("/dashboard");
    }

    if (edit) {
      history.push(`/profile/${id}`);
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profiles/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education added", "green"));

    //dispatch(setAlert(edit && "Profile updated"));
    //history.push(`/profile/:${id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete education
export const deleteEducation = (id, edu_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/profiles/education/${id}/${edu_id}`);

    dispatch({
      type: UPDATE_EDUCATION,
      payload: edu_id,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profiles/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience added", "green"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete experience
export const deleteExperience = (id, exp_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/profiles/experience/${id}/${exp_id}`);

    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: exp_id,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = (history) => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await axios.delete("/api/profiles");
      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      history.push("/register");
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//delete experience the old version
// export const deleteExperience = (id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`/api/profiles/experience/:${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
