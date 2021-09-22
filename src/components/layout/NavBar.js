import { Link } from "react-router-dom";
import PropTypes from "prop-types";
 
// redux stuff
import { connect } from "react-redux";

// components
import Notifications from "../Navbar/Notifications";

const linkStyles = {
    color: "red",
    marginLeft: "2rem",
    textDecoration:"none"
}

const navBarStyle = {
    backgroundColor: "black",
    height: "40px",
    position: "fixed",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
}


const NavBar = (props) =>{

    // component props
    const {authenticated,userhandle} = props;

    const displayNavBar = authenticated ? 
        ( <div style={{display:"flex"}}>
            <Link to="/" style={linkStyles}>Home</Link>
            <Link to={`/profile/${userhandle}`} style={linkStyles}>Profile</Link>
            <Notifications />
            </div>)
        :
        (<div>
            <Link to="/" style={linkStyles}>Home</Link>
            <Link to="/login" style={linkStyles}>Login</Link>
            <Link to="/signup" style={linkStyles}>Sign up</Link>
            <Link to={`/profile/${userhandle}`} style={linkStyles}>Profile</Link>
            </div>)
    

    return(
        <div style={navBarStyle}>
            {displayNavBar}
        </div>
    )
}


NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}


const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
}) 


export default connect(mapStateToProps)(NavBar);