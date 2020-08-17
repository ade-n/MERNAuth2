import React, { Fragment } from "react";
import "../image.css";
import PropTypes from "prop-types";

import ProfileInfo from "./ProfileInfo";
import Profiles from "./Profiles/Profiles";
import Posts from "./Posts/Posts";
import Spinner from "../../layout/Spinner";

import { connect } from "react-redux";

const ProfileDashboard = ({
  auth: { loading, user },
  profile: { profile, profiles },
  post: { posts },
  postLoading,
}) => {
  return (
    <div className="px-12 py-24 w-full flex md:flex-row flex-col ">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ProfileInfo auth={user} profile={profile} />
          <Posts posts={posts} />
          <Profiles profiles={profiles} />
        </Fragment>
      )}
    </div>
  );
};

ProfileDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  //post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps)(ProfileDashboard);
