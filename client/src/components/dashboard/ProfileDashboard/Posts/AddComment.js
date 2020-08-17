import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addComment } from "../../../../actions/post";

const AddComment = ({ addComment, postId, profileId, avatar }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };
  return (
    <div className="flex w-full py-4">
      <Link to={`/profile/${profileId}`}>
        <img
          src={avatar}
          alt="profile"
          className="rounded-full w-12 h-12 mr-4"
        />
      </Link>{" "}
      <form className=" w-full border border-gray-300 flex" onSubmit={onSubmit}>
        <textarea
          className="outline-none w-full p-2 h-12"
          placeholder="Add comment"
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          className=" outline-none cursor-pointer font-semibold bg-white text-gray-700 float-right  "
          value="Submit"
        />
      </form>
    </div>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(AddComment);
