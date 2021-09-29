import { useState } from "react";
import { useHistory } from "react-router"; // hook to redirect the user to other page
import PropTypes from "prop-types"; // proptypes

// styles

import "../styles/PageStyle.css";
import "../styles/formStyle.css";
// redux stuff
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userAction";

const SignUpPage = (props) => {
  const [userEmail, setuserEmail] = useState(""); // user email
  const [confirmedPassword, setconfirmedPassword] = useState(""); // user email
  const [userPassword, setuserPassword] = useState(""); // userpassword
  const [userhandle, setuserHandle] = useState("");
  // const [errors,setErrors] = useState({}); // error to show to the user

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: userEmail,
      password: userPassword,
      confirmPassword: confirmedPassword,
      handle: userhandle,
    };

    props.signUpUser(userData, history);
  };

  const handleChange = ({ target }) => {
    if (target.name === "email") {
      setuserEmail(target.value);
    } else if (target.name === "password") {
      setuserPassword(target.value);
    } else if (target.name === "confirmedPassword") {
      setconfirmedPassword(target.value);
    } else if (target.name === "handle") {
      setuserHandle(target.value);
    }
  };

  const {
    UI: { loading },
  } = props;

  return (
    <div>
      <div className="page-container">
        <header className="header-format">
          <h1>Sign Up</h1>
        </header>
        <div className="div-content">
          <form
            className="form-format"
            id="signin-form"
            onSubmit={handleSubmit}
          >
            <h2 className="form-title">Sign In:</h2>
            <label htmlFor="email"></label>
            <input
              className="input-format"
              type="email"
              id="email"
              name="email"
              placeholder="Email:"
              value={userEmail}
              onChange={handleChange}
            />
            <label htmlFor="password"></label>
            <input
              className="input-format"
              type="password"
              id="password"
              name="password"
              placeholder="Password:"
              value={userPassword}
              onChange={handleChange}
            />
            <label htmlFor="confirmedPassword"></label>
            <input
              className="input-format"
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              placeholder="Confirm Password:"
              value={confirmedPassword}
              onChange={handleChange}
            />
            <label htmlFor="handle"></label>
            <input
              className="input-format"
              type="text"
              id="handle"
              name="handle"
              placeholder="handle:"
              value={userhandle}
              onChange={handleChange}
            />
            <div className="buttons-div">
              <button
                className="button-format    "
                type="submit"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SignUpPage.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapActionsToProps = {
  signUpUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignUpPage);
