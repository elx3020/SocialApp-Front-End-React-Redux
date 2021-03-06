// React Hooks
import { useEffect } from "react";

// styles

import "../styles/PageStyle.css";

// redux stuff
import { connect } from "react-redux";
import {
  getComments,
  getPost,
  getOnlyPost,
} from "../redux/actions/dataActions";
import { useParams } from "react-router";

// components
import PostDetails from "../components/posts/PostDetails";
import CommentComponent from "../components/posts/CommentComponent";
import CreateComment from "../components/posts/CreateComment";

const PostpageStyle = {
  display: "flex",
  alignItems: "center",
  width: "60%",
};

const commentSectionStyle = {
  backgroundColor: "black",
  padding: "10px",
};

const PostDetailPage = (props) => {
  let { post_handle } = useParams();

  const { post, loading, loadingComments, comments } = props;

  useEffect(() => {
    if (post && Object.keys(post).length === 0 && post.constructor === Object) {
      props.getOnlyPost(post_handle);
      props.getComments(post_handle);
    } else if (post.postId !== post_handle) {
      props.getOnlyPost(post_handle);
      props.getComments(post_handle);
    } else {
      props.getPost(post_handle);
      props.getComments(post_handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_handle]);

  const displayPostDetails = loading ? (
    <h1>Loading...</h1>
  ) : (
    <PostDetails key={post.postId} post={post} />
  );

  const displayComments = loadingComments ? (
    <h1>Loading Comments...</h1>
  ) : !comments.length === true ? (
    <h1>No comments yet..</h1>
  ) : (
    comments.map((comment) => (
      <CommentComponent key={comment.createdAt} comment={comment} />
    ))
  );

  return (
    <div className="page-container">
      <div className="div-content">
        <div style={PostpageStyle}>
          <div className="post-container center" style={{ flex: "2" }}>
            {displayPostDetails}
            <div style={commentSectionStyle}>{displayComments}</div>
            <div>
              <CreateComment postId={post_handle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: add proptypes

const mapStateToProps = (state) => ({
  loadingComments: state.data.loadingComments,
  loading: state.data.loading,
  post: state.data.post,
  comments: state.data.comments,
});

const mapActionsToProps = {
  getPost,
  getComments,
  getOnlyPost,
};

export default connect(mapStateToProps, mapActionsToProps)(PostDetailPage);
