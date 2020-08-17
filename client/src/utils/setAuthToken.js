import axios from "axios";
//thi is meant to be a global header
//this is complicated. this function is checking wether there is a token it will be added to the header if there is no toke

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
