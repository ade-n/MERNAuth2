import React from "react";
import PostItem from "./PostItem";
import AddPost from "./AddPost";

import Spinner from "../../../layout/Spinner";

const Posts = ({ posts }) => {
  return posts === null ? (
    <Spinner />
  ) : (
    <div className="md:w-2/4 w-full md:mx-4 mx-auto flex flex-col md:my-0 my-12">
      <AddPost />

      <div className="pt-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="bg-white shadow-md my-2 p-6 " key={post._id}>
              <PostItem post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700">!! No posts added !!</div>
        )}
      </div>
    </div>
  );
};

export default Posts;
