import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

// styles
import "../../styles/Card.css";
import "../../styles/iconsStyles.css";
// redux
import { connect } from "react-redux";
import {
  likePost,
  unlikePost,
  deletePost,
} from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

// Post Card Component

const PostCard = (props) => {
  // data:
  const {
    post: {
      title,
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      commentCount,
      postId,
    },
    user: { authenticated, credentials },
  } = props;

  // hook
  let history = useHistory();

  //  helper functions
  const userPost = () => {
    if (userHandle === credentials.handle) {
      return true;
    } else {
      return false;
    }
  };

  // check if user already like the post
  const likedPost = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.postId === postId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // click handlers

  const handlePostDetails = () => {
    history.push(`${userHandle}/post/${postId}`);
  };

  const handleClickLike = () => {
    props.likePost(postId);
  };

  const handleClickUnlike = () => {
    props.unlikePost(postId);
  };

  const handleClickDelete = () => {
    props.deletePost(postId);
  };

  // like button

  const likebutton = !authenticated ? (
    <button>
      <Link to="/login">Like</Link>
    </button>
  ) : likedPost() ? (
    <button onClick={handleClickUnlike}>Unlike</button>
  ) : (
    <button onClick={handleClickLike}>Like</button>
  );

  // delete button

  const deletePostButton = !authenticated ? (
    <p>
      <Link to="/login">by {userHandle}</Link>
    </p>
  ) : userPost() ? (
    <button onClick={handleClickDelete}>Delete</button>
  ) : (
    <p>by {userHandle}</p>
  );

  return (
    <div className="card-container">
      <div className="card-head">
        <div id="user-image">
          <img src={userImage} alt="userImage" />
        </div>
        <h3>{title}</h3>
        <div id="toggle">{deletePostButton}</div>
      </div>
      <div className="card-content">
        <p onClick={handlePostDetails}>{body}</p>
        <span>{dayjs(createdAt).format("MMM YYYY")}</span>
      </div>
      <div className="card-footer">
        {likebutton}
        <span>likes {likeCount}</span>
        <span>comments {commentCount}</span>
      </div>
    </div>
  );
};

PostCard.porpTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
  deletePost,
};

export default connect(mapStateToProps, mapActionsToProps)(PostCard);
