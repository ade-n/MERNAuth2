import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../assets/fonts.css";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const publicNav = (
    <div className="Roboto text-white flex justify-between">
      <div>
        <Link
          className="bg-indigo-500  px-4 py-2 rounded-full mx-4 hover:shadow-md "
          to="/login"
        >
          Login
        </Link>
      </div>
      <div>
        <Link
          className="bg-indigo-500 px-4 py-2 rounded-full hover:shadow-md"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );

  const privateNav = (
    <div className="Roboto text-white flex justify-between">
      <div>
        <Link
          className="bg-indigo-500  px-4 py-2 rounded-full mx-4 hover:shadow-md "
          to="/dashboard"
        >
          Dashboard
        </Link>
      </div>
      <div>
        <a
          onClick={logout}
          href="/login"
          className="bg-indigo-500 px-4 py-2 rounded-full hover:shadow-md"
        >
          Logout
        </a>
      </div>
    </div>
  );

  return (
    <div
      style={{ height: "80px" }}
      className=" fixed z-10 w-full flex justify-between py-6 px-12 "
    >
      <div className="Roboto text-indigo-500 text-xl ">
        <Link to="/">EliZa</Link>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? privateNav : publicNav}</Fragment>
      )}
    </div>
  );
};

NavBar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
