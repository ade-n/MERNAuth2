import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import EducationItem from "./EducationItem";

const ProfileEducation = ({ profile: { _id, user, education }, auth }) => {
  return (
    <div className="md:w-1/2 -full mx-auto">
      {education.length > 0 ? (
        <div className=" m-6 p-4 shadow-lg bg-white">
          <div className="flex justify-between py-4">
            <div className="text-2xl text-gray-700 ">Education</div>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === user._id && (
                <div className="text-2xl text-gray-700 ">
                  <Link to="/add-education">+</Link>
                </div>
              )}
          </div>

          {education.map((edu) => (
            <div key={edu._id}>
              <hr />
              <EducationItem
                education={edu}
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
            <Link to="/add-education">
              <div className=" text-indigo-700 text-center  m-6 p-4 shadow-lg bg-white">
                + Add Education
              </div>
            </Link>
          ) : (
            <div className=" text-indigo-700 text-center  m-6 p-4 shadow-lg bg-white">
              No education added
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfileEducation;
