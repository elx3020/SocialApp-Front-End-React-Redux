import { useEffect } from "react";
import PropTypes from "prop-types";

// styles
import "../styles/PageStyle.css";

// redux stuff
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

// components
import PostCard from "../components/posts/PostCard";
import Feedhead from "../components/homepage/Feedhead";
import HomeSkeletal from "../components/skeletal/HomeSkeletal";

const homepageStyle = {
  display: "flex",
  width: "100%",
};

const HomePage = (props) => {
  useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { posts, loading } = props.data;

  let displayPost = loading ? (
    <HomeSkeletal />
  ) : (
    posts.map((post) => <PostCard key={post.postId} post={post} />)
  );

  return (
    <div className="page-container">
      <div className="div-content">
        <div style={homepageStyle}>
          <div className="left" style={{ flex: "1" }}></div>
          <div className="post-container center" style={{ flex: "1.5" }}>
            <Feedhead />
            {displayPost}
          </div>
          <div className="right" style={{ flex: "1" }}></div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(HomePage);
