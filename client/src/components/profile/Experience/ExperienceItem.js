import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Moment from "react-moment";
import { deleteExperience } from "../../../actions/profile";
import { connect } from "react-redux";

const ExperienceItem = ({
  auth,
  deleteExperience,
  experience: { _id, title, company, to, fieldofstudy, description, from },
  profileId,
  profile,
}) => {
  return (
    <Fragment>
      <hr />
      <div className="flex justify-between">
        <div className="py-4">
          <div className=" text-gray-700 font-bold">{title}</div>
          <div className=" text-gray-700 ">
            {company}, {fieldofstudy}
          </div>
          <div className=" text-gray-700 ">
            <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
            {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
          </div>
          <div className=" text-gray-700 pt-2">{description}</div>
        </div>

        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile && (
            <div
              onClick={() => deleteExperience(profileId, _id)}
              className="text-2xl text-gray-700 cursor-pointer"
            >
              -
            </div>
          )}
      </div>
    </Fragment>
  );
};

ExperienceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceItem);

// {
//   auth.isAuthenticated &&
//     auth.loading === false &&
//     auth.user._id === profile.user._id && (
//       <div
//         onClick={() => deleteExperience(profileId, _id)}
//         className="text-2xl text-gray-700 cursor-pointer"
//       >
//         -
//       </div>
//     );
// }
