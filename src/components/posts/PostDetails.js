import dayjs from "dayjs";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import {
  likePost,
  unlikePost,
  deletePost,
} from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

//  styles mostly simple and temporal
let titleStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const cardStyle = {
  backgroundColor: "white",
  color: "black",
  padding: "1rem",
  border: "1px solid gray",
};

const contentStyle = {
  marginTop: "1rem",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

// Post Details Component

const PostDetails = (props) => {
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
    <div style={cardStyle}>
      
        <div style={titleStyle}>
            <img
            src={userImage}
            alt="userImage"
            style={{ width: "50px", height: "auto" }}
            />
            <h2>{title}</h2>
            {deletePostButton}
        </div>
        <div className="content" style={contentStyle}>
            <p>{body}</p>
            <span style={{ fontSize: "0.8rem" }}>
            {dayjs(createdAt).format("MMM YYYY")}
            </span>
        </div>
        <div className="post-footer" style={footerStyle}>
            {likebutton}
            <span>likes {likeCount}</span>
            <span>comments {commentCount}</span>
        </div>
    </div>
    
  );
};

PostDetails.porpTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(PostDetails);
