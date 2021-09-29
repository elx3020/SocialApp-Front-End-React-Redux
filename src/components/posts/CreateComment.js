import { useState } from "react";

import PropTypes from "prop-types";

// redux stuff

import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";

const CreateComment = (props) => {
  // state
  const [comment, setComment] = useState("");

  const { postId } = props;

  // handlers
  const handleSubmitComment = (event) => {
    event.preventDefault();
    const commentData = {
      body: comment,
    };
    props.postComment(postId, commentData);
    setComment("");
  };

  const handleCommentChange = ({ target }) => {
    if (target.name === "comment") {
      setComment(target.value);
    }
  };

  return (
    <div>
      <img src="" alt="" />
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="comment"></label>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment..."
          onChange={handleCommentChange}
          value={comment}
        />
        <button type="submit">Comment!</button>
      </form>
    </div>
  );
};

// TODO: add proptypes

CreateComment.propTypes = {
  postComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userImage: state.user.credentials.imageUrl,
});

const mapActionsToProps = {
  postComment,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateComment);
