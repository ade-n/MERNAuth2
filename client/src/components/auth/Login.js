import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./auth.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [FormData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = FormData;

  const onChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="w-full flex items-center h-screen bg-indigo-700">
        <div className=" mx-auto p-4 ">
          <div className="text-4xl text-center py-4 text-white">Welcome!</div>
          <p className="text-center text-white">Log into your account</p>
          <form className="py-4" onSubmit={onSubmit}>
            <div className="email">
              <label className="block py-2 text-white">Email</label>
              <input
                autoComplete="off"
                className="focus:outline-none px-4 py-3 bg-indigo-500"
                name="email"
                placeholder="jdoe@test.com"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="password">
              <label className="block py-2 text-white">Password</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500"
                name="password"
                placeholder="Password"
                type="password"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="focus:outline-none text-white bg-red-500 px-4 py-2 rounded-full w-full text-center my-8 shadow-md hover:bg-red-400"
            >
              Login
            </button>
            <div className="text-gray-200 text-center">
              I don't have an account!
            </div>
            <div className="text-center font-bold text-gray-200 border border-red-500 py-2 px-4 my-6 hover:bg-indigo-500 hover:border-indigo-500 cursor-pointer">
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
