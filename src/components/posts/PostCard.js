import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

// styles
import "../../styles/Card.css";
import "../../styles/iconsStyles.css";
import "../../styles/buttonsStyle.css";
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
    <button className="button unlike">
      <Link to="/login">
        <i className="far fa-heart"></i>
      </Link>
    </button>
  ) : likedPost() ? (
    <button className="button like" onClick={handleClickUnlike}>
      <i className="fas fa-heart"></i>
    </button>
  ) : (
    <button className="button unlike" onClick={handleClickLike}>
      <i className="far fa-heart"></i>
    </button>
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
        <div className="likes-section">
          {likebutton}
          <p>{likeCount}</p>
        </div>

        <span onClick={handlePostDetails}>
          <i className="fas fa-comments"></i> Comments: {commentCount}
        </span>
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
