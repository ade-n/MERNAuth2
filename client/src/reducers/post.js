import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_POST,
  UPDATE_COMMENT,
} from "../actions/types";

const initialState = [
  {
    error: {},
    loading: true,
    posts: [],
    post: null,
  },
];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS: {
      return { ...state, loading: false, posts: payload };
    }
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case ADD_POST:
      return { ...state, loading: false, posts: [payload, ...state.posts] };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, comments: payload.comments }
            : post
        ),
        loading: false,
      };
    case POST_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
