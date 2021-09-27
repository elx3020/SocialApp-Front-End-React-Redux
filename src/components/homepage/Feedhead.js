import { connect } from "react-redux";
import Proptypes from "prop-types";
import { setPost } from "../../redux/actions/dataActions";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/FeedHeadStyle.css";
const FeedHead = (props) => {
  // data from redux tree

  const { authenticated } = props;
  const { loading } = props;
  const { handle, imageUrl } = props.credentials;

  const [postTitle, setpostTitle] = useState("");

  const [postBody, setpostBody] = useState("");

  // handle change to make form visible

  // handle submit post

  const submitPost = (event) => {
    event.preventDefault();

    const postData = {
      title: postTitle,
      body: postBody,
    };
    if (postData.title !== "" && postData.body !== "") {
      props.setPost(postData);
      setpostTitle("");
      setpostBody("");
    } else {
      window.alert("Cannot post without text.");
    }
  };

  // handle change of input // make a uncotrolled component controlled

  const handleChange = ({ target }) => {
    if (target.name === "title") {
      setpostTitle(target.value);
    } else if (target.name === "body") {
      setpostBody(target.value);
    }
  };

  const userHead = (
    <div className="feed-head-container">
      <div className="feed-head-header">
        <img
          src={imageUrl}
          alt="user_image"
          style={{ width: "50px", height: "auto" }}
        />
        <h3>{handle}</h3>
      </div>
      <form className="feed-form" onSubmit={submitPost}>
        <div className="form-input">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title:"
            onChange={handleChange}
            value={postTitle}
          />
          <textarea
            name="body"
            id="body"
            rows="2"
            placeholder="What is it in your mind?"
            onChange={handleChange}
            value={postBody}
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div className="footer-panel-head">
          <i className="fas fa-hamsa"></i>
          <button className="submit-button" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );

  const noUserHead = (
    <div className="feed-head-no-user">
      <Link to="/signup">
        <h1>Sign In</h1>
      </Link>
    </div>
  );

  return !loading ? authenticated ? userHead : noUserHead : <h1>Loading...</h1>;
};

FeedHead.propType = {
  authenticated: Proptypes.bool.isRequired,
  credentials: Proptypes.object.isRequired,
  setPost: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
  loading: state.user.loading,
});

const mapActionsToProps = {
  setPost,
};

export default connect(mapStateToProps, mapActionsToProps)(FeedHead);
