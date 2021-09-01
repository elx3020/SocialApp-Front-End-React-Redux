import { connect } from "react-redux"
import Proptypes from "prop-types" 
import {setPost} from "../../redux/actions/dataActions"
import { useState } from "react"







const FeedHead = (props) => {

    // data from redux tree


    const {authenticated} = props;
    const {loading} = props;
    const {imageUrl} = props.credentials;


    const [postTitle,setpostTitle] = useState('');

    const [postBody,setpostBody] = useState('');

    // handle change to make form visible




    // handle submit post

    const submitPost = (event) =>{
        event.preventDefault();

        const postData = {
            title: postTitle,
            body: postBody,
        }
        if(postData.title !== '' && postData.body !== ''){
            props.setPost(postData);
            setpostTitle('');
            setpostBody('');
        }else{
            window.alert("Cannot post without text.");
        }

        
    }


    // handle change of input // make a uncotrolled component controlled

    const handleChange = ({target}) => {
        if(target.name === "title"){
            setpostTitle(target.value);
        }else if(target.name === "body"){
            setpostBody(target.value)
        }

    }



    const headStyle = {
        display: "flex",
        marginBotton: "1rem",
        alignItems: "center",
        justifyContent: "space-around"
    }

    const formstyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        
    }

    const userHead = (
        <div style={{backgroundColor:"black"}}>
            <div className="header" style={headStyle}>
                <img src={imageUrl} alt="user_image" style={{width: "50px",height: "auto"}} />
                <h2>Make a post!</h2>
            </div>
            <form onSubmit={submitPost} style={formstyle}>
                <input type="text" name="title" id="title" placeholder="Title:" onChange={handleChange} value={postTitle}/>
                <textarea name="body" id="body" rows="4" placeholder="What is it in your mind?" onChange={handleChange} value={postBody} style={{resize:"none"}}></textarea>
                <button type="submit">Post</button>
            </form>
        </div>);

    const noUserHead = (
        <div style={{backgroundColor:'black', textAlign:"center"}}>
            <h1>Sign In</h1>
            <h2>to makes posts</h2>
        </div>

    )


    return !loading ? authenticated ? userHead : noUserHead : (<h1>Loading...</h1>);
}



FeedHead.propType = {
    authenticated: Proptypes.bool.isRequired,
    credentials: Proptypes.object.isRequired,
    setPost: Proptypes.func.isRequired
}



const mapStateToProps = (state) =>(
    {
        authenticated: state.user.authenticated,
        credentials: state.user.credentials,
        loading: state.user.loading
    }
)
    

const mapActionsToProps = {
    setPost
}



export default connect(mapStateToProps,mapActionsToProps)(FeedHead)