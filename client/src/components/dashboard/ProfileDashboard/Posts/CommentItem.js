import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteComment } from "../../../../actions/post";
import { connect } from "react-redux";

const CommentItem = ({
  auth,
  deleteComment,
  postId,
  comment: { _id, text, name, user, avatar, status },
}) => {
  return (
    <div className="flex py-4 text-sm">
      <Link to={`/profile/${user}`}>
        <img
          src={avatar}
          alt="profile"
          className="rounded-full w-12 h-12 mr-4"
        />
      </Link>{" "}
      <div className=" w-full bg-gray-300 p-2 rounded-md rounded-tl-none">
        <div className="flex justify-between">
          <div className="pb-2 text-gray-700">
            <div className="font-semibold ">{name}</div>
            <div className="font-thin text-sm ">{status}</div>
          </div>

          {!auth.loading && user === auth.user._id && (
            <div
              type="button"
              onClick={() => deleteComment(postId, _id)}
              className="font-thin text-gray-700 cursor-pointer"
            >
              <svg
                className="fill-current text-gray-700 inline-block h-3 w-3 hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
              </svg>
            </div>
          )}
        </div>

        <div className="font-thin text-gray-700">{text}</div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
