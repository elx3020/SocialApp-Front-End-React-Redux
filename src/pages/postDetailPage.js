import PostDetails from "../components/posts/PostDetails";
import { useEffect } from "react";

import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";
import { useParams } from "react-router";
const PostpageStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "50px"
}





const PostDetailPage = (props) =>{

    let {post_handle} = useParams(); 

    const {post,loading} = props;

    useEffect(()=>{
        props.getPost(post_handle)

    },[])

    const displayPostDetails = loading ? (<h1>Loading...</h1>) : (<PostDetails key={post.postId} post={post}/>);

    return (
        <div style={PostpageStyle}>
            <div className="left" style={{flex:'1'}}></div>
            <div className="post-container center" style={{flex:'2'}}>
                 {displayPostDetails}
            </div>
            <div className="right" style={{flex:'1'}}></div>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        loading: state.data.loading,
        post: state.data.post,
    }
)

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps,mapActionsToProps)(PostDetailPage);