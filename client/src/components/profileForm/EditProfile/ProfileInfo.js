import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProfileInfo = ({ profile: { profile } }) => {
  const { _id, avatar, name } = profile.user;
  const { location, status, company, skills } = profile;
  return (
    <Fragment>
      <div className="md:w-1/4 w-full text-center">
        <Link to={`/profile/${_id}`}>
          <img
            src={avatar}
            alt="profile"
            className="w-40 h-40 rounded-full mx-auto p-2 border border-0"
          />
        </Link>
        <div className=" text-indigo-500 text-xl font-bold">{name}</div>
        <div className="text-gray-700">{status}</div>

        <div className="pt-6 pb-2 text-gray-700 font-bold">Profile</div>
        <hr />
        <div className="p-2 text-gray-700">
          <div className="font-thin">
            {location.length > 0 && company.length > 0 ? (
              <span>{company} / </span>
            ) : (
              <span>{company}</span>
            )}
            {location}
          </div>
        </div>
        <div className="p-2 text-gray-700 ">
          <div className="font-medium">Skills</div>
          <div className="font-thin">{skills}</div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileInfo);
