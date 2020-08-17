import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_POST,
  UPDATE_COMMENT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      heads: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/posts", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create comment
export const addComment = (id, formData) => async (dispatch) => {
  const config = {
    heads: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/posts/comment/${id}`, formData, config);
    dispatch({
      type: UPDATE_COMMENT,
      payload: { id, comments: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete post
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT,
      payload: { id, comments: res.data },
    });

    dispatch(setAlert("Comment Removed", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//like post
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//unlike post
export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
