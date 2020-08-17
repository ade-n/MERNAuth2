import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItems = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
  },
}) => {
  return (
    <Fragment>
      <div className="flex py-4">
        <Link to={`/profile/${_id}`}>
          <img src={avatar} alt="profile" className="rounded-full w-16 h-16 " />
        </Link>

        <div className="px-4">
          <div className="font-medium text-gray-700">{name}</div>
          {company && <div className="font-light">{company}</div>}
          <div className="font-light">{status}</div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItems;
