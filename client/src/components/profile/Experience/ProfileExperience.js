import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import ExperienceItem from "./ExperienceItem";

const ProfileExperience = ({ profile: { _id, experience, user }, auth }) => {
  return (
    <div className="md:w-1/2 -full mx-auto">
      {experience.length > 0 ? (
        <div className=" m-6 p-4 shadow-lg bg-white flex-wrap">
          <div className="flex justify-between py-4">
            <div className="text-2xl text-gray-700 ">Experience</div>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === user._id && (
                <div className="text-2xl text-gray-700 ">
                  <Link to="/add-experience">+</Link>
                </div>
              )}
          </div>

          {experience.map((exp) => (
            <div key={exp._id}>
              <ExperienceItem
                experience={exp}
                auth={auth}
                profileId={_id}
                profile={user._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <Fragment>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === user._id ? (
            <Link to="/add-experience">
              <div className=" text-indigo-700 text-center  m-6 p-4 shadow-lg bg-white">
                + Add Experience
              </div>
            </Link>
          ) : (
            <div className=" text-indigo-700 text-center  m-6 p-4 shadow-lg bg-white">
              No experience added
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfileExperience;
