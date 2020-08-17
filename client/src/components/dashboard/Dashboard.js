import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import "./image.css";
import { getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import NoProfile from "./NoProfile";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import { getProfiles } from "../../actions/profile";
import { getPosts } from "../../actions/post";

const Dashboard = ({
  getPosts,
  getProfiles,
  getProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getPosts();
    getProfile();
    getProfiles();
  }, [getProfile, getProfiles, getPosts]);

  return (
    <Fragment>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {profile !== null ? (
            <ProfileDashboard />
          ) : (
            <NoProfile userName={user && user.name} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getProfile,
  getProfiles,
  getPosts,
})(Dashboard);
