import { useState } from "react";
import { useHistory } from "react-router"; // hook to redirect the user to other page
import PropTypes from "prop-types"; // proptypes

// redux stuff
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userAction";

const SignUpPage = (props)=>{

    const [userEmail, setuserEmail] = useState(''); // user email
    const [confirmedPassword, setconfirmedPassword] = useState(''); // user email
    const [userPassword, setuserPassword] = useState(''); // userpassword
    const [userhandle,setuserHandle] = useState('');
    // const [errors,setErrors] = useState({}); // error to show to the user

    let history = useHistory();



    const handleSubmit = (event)=>{ 
        event.preventDefault();
        const userData = {
            email: userEmail,
            password: userPassword,
            confirmPassword: confirmedPassword,
            handle: userhandle
        }

        props.signUpUser(userData,history);
        
    }

    const handleChange = ({target})=>{

        if(target.name === 'email'){
            setuserEmail(target.value);
        }else if(target.name === 'password'){
            setuserPassword(target.value);
        }else if(target.name === 'confirmedPassword'){
            setconfirmedPassword(target.value);
        }else if(target.name === 'handle'){
            setuserHandle(target.value);
        }
    }

    const {UI: {loading}} = props;
        

    return(
        <div>
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width:'300px'}} >
                    <label htmlFor="email"></label><input type="email" id="email" name="email" placeholder="Email:" value={userEmail} onChange={handleChange} />
                    <label htmlFor="password"></label><input type="password" id="password" name="password" placeholder="Password:" value={userPassword} onChange={handleChange} />
                    <label htmlFor="confirmedPassword"></label><input type="password" id="confirmedPassword" name="confirmedPassword" placeholder="Confirm Password:" value={confirmedPassword} onChange={handleChange}/>
                    <label htmlFor="handle"></label><input type="text" id="handle" name="handle" placeholder="handle:" value={userhandle} onChange={handleChange}/>
                    <button type="submit" disabled={loading}>SignUp</button>
                </form>
            </div>
        </div>
    )

}

SignUpPage.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
};



const mapStateToProps = (state) =>{
    return (
        {
        user: state.user,
        UI: state.UI
        }
    )
}


const mapActionsToProps = {
    signUpUser
}


export default connect(mapStateToProps,mapActionsToProps)(SignUpPage);