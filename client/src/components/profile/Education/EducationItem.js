import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../../actions/profile";

const EducationItem = ({
  profile,
  profileId,
  auth,
  deleteEducation,
  education: { _id, school, degree, fieldofstudy, to, from },
}) => {
  return (
    <div className="flex justify-between">
      <div className="py-4">
        <div className=" text-gray-700 font-bold">{school}</div>
        <div className=" text-gray-700 ">
          {degree}, {fieldofstudy}
        </div>
        <div className=" text-gray-700 ">
          <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
          {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
        </div>
      </div>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile && (
          <div
            onClick={() => deleteEducation(profileId, _id)}
            className="text-2xl text-gray-700 cursor-pointer"
          >
            -
          </div>
        )}
    </div>
  );
};

EducationItem.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationItem);
