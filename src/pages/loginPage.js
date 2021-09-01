
import { useState } from "react";
import { useHistory } from "react-router"; // hook to redirect the user to other page
import PropTypes from "prop-types";

// redux stuff
import { connect } from 'react-redux';
import { loginUser } from "../redux/actions/userAction";

const LoginPage = (props)=>{

    const [userEmail, setuserEmail] = useState(''); // user email
    const [userPassword, setuserPassword] = useState(''); // userpassword
    // const [loading,setLoading] = useState(false); // parameter to display a loading animation

    let history = useHistory();


    // handle the submit of the form
    const handleSubmit = (event)=>{ 
        event.preventDefault();
        const userData = {
            email: userEmail,
            password: userPassword
        }

        props.loginUser(userData, history) // redux related, basically pass the data from the store to the props of this component
       
        
    }

// handle to update the states of the components base on the change event of the html event
    const handleChange = ({target})=>{

        if(target.name === 'email'){
            setuserEmail(target.value);
        }else if(target.name === 'password'){
            setuserPassword(target.value);
        }
        
    }


    const {UI: {loading}} = props; // loading value is store inside the props object inside the UI

    return(
        <div>
            <h1>LoginPage</h1>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="email"></label><input type="email" id="email" name="email" placeholder="Email:" value={userEmail} onChange={handleChange} />
                    <label htmlFor="password"></label><input type="password" id="password" name="password" placeholder="Password:" value={userPassword} onChange={handleChange} />
                    <button type="submit" disabled={loading} >Login</button>
                </form>
            </div>
        </div>
    )

}

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,

}


const mapStateToProps = (state) =>(
    {user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}


export default connect(mapStateToProps, mapActionsToProps)(LoginPage);