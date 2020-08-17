import React from "react";
import ProfileItems from "./ProfileItems";

const PostsAndProfiles = ({ profiles }) => {
  return (
    <div className="md:w-1/4 w-full md:mx-4 mx-auto pb-6">
      <div className="pb-4 text-gray-700 font-medium">View Profiles</div>
      <div className="w-full">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            return <ProfileItems key={profile._id} profile={profile} />;
          })
        ) : (
          <h4>No profiles were found</h4>
        )}
      </div>
    </div>
  );
};

export default PostsAndProfiles;
