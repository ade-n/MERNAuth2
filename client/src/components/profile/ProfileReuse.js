import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//components
import Spinner from "../layout/Spinner";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileAbout from "./ProfileAbout";

//redux
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { deleteAccount } from "../../actions/profile";

const Profile = ({
  getProfileById,
  history,
  deleteAccount,
  profile: { profile, loading },
  match,
  auth: { user },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className=" w-full bg-indigo-700  ">
            <ProfileAbout profile={profile} user={user} />
          </div>
          <div className="md:flex justify-between flex-wrap">
            <ProfileEducation />
            <ProfileExperience />
          </div>
          <div className="text-right">
            <button
              onClick={() => deleteAccount(history)}
              className="focus:outline-none bg-red-500 text-white px-4 py-2 rounded-full  text-center m-12 shadow-md hover:bg-red-400  "
            >
              Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
  withRouter(Profile)
);
