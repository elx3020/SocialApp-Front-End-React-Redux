

import { useEffect } from "react";


import PropTypes from "prop-types";
// redux stuff
import { connect } from "react-redux";
import {getPosts} from "../redux/actions/dataActions";



// components
import PostCard from "../components/posts/PostCard";
import Feedhead from "../components/homepage/Feedhead";

const homepageStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "50px"
}





const HomePage = (props)=>{

    
    useEffect(()=>{
       props.getPosts();

    },[])

    const {posts, loading} = props.data;

    let displayPost = loading ? (<h1>Loading...</h1>) : (posts.map(post => <PostCard key={post.postId} post={post} /> ));

    return(
        <div style={homepageStyle}>
            <div className="left" style={{flex:'1'}}></div>
            <div className="post-container center" style={{flex:'1'}}>
                <Feedhead />
                 {displayPost}
            </div>
            <div className="right" style={{flex:'1'}}></div>
        </div>
    )

}


HomePage.propTypes = {
    data: PropTypes.object.isRequired
}


const mapStateToProps = (state) => (
    {
        data: state.data
    }
)

export default connect(mapStateToProps, {getPosts})(HomePage);