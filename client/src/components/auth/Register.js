import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./auth.css";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    password2: "",
  });

  const { email, password, name, password2 } = FormData;

  const onChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "red");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className=" w-full flex items-center h-screen bg-indigo-700">
        <div className="mx-auto p-4 ">
          <div className="text-4xl text-center py-4 text-white">
            Register now!
          </div>
          <p className="text-center text-white">Create an account</p>
          <form className="py-4" onSubmit={onSubmit}>
            <div className="flex">
              <div className="user mr-2">
                <label className="block py-2 text-white">Name</label>
                <input
                  autoComplete="off"
                  className="focus:outline-none px-4 py-3 bg-indigo-500"
                  name="name"
                  value={name}
                  placeholder="John Doe"
                  type="text"
                  onChange={onChange}
                />
              </div>
              <div className="email">
                <label className="block py-2 text-white">Email</label>
                <input
                  autoComplete="off"
                  className="focus:outline-none px-4 py-3 bg-indigo-500"
                  name="email"
                  value={email}
                  placeholder="jdoe@test.com"
                  type="text"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="password ">
              <label className="block py-3 text-white">Password</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                onChange={onChange}
              />
            </div>
            <div className="password ">
              <label className="block py-3 text-white">Confirm Password</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="password2"
                value={password2}
                placeholder="Password2"
                type="password"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="focus:outline-none text-white bg-red-500 px-4 py-2 rounded-full w-full text-center my-8 shadow-md hover:bg-red-400"
            >
              Register
            </button>
            <div className="text-gray-200 text-center">
              Already have an account!
            </div>
            <div className=" focus:outline-none text-center font-bold text-gray-200 border border-red-500 py-2 px-4 my-6 hover:bg-indigo-500 hover:border-indigo-500 cursor-pointer">
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
