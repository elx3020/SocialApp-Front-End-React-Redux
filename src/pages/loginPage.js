import { useState } from "react";
import { useHistory } from "react-router"; // hook to redirect the user to other page
import PropTypes from "prop-types";

// styles

import "../styles/PageStyle.css";
import "../styles/formStyle.css";
// redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

const LoginPage = (props) => {
  const [userEmail, setuserEmail] = useState(""); // user email
  const [userPassword, setuserPassword] = useState(""); // userpassword
  // const [loading,setLoading] = useState(false); // parameter to display a loading animation

  let history = useHistory();

  // handle the submit of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: userEmail,
      password: userPassword,
    };

    props.loginUser(userData, history); // redux related, basically pass the data from the store to the props of this component
  };

  // handle to update the states of the components base on the change event of the html event
  const handleChange = ({ target }) => {
    if (target.name === "email") {
      setuserEmail(target.value);
    } else if (target.name === "password") {
      setuserPassword(target.value);
    }
  };

  const {
    UI: { loading },
  } = props; // loading value is store inside the props object inside the UI

  return (
    <div>
      <div className="page-container">
        <header className="header-format">
          <h1>Login Page</h1>
        </header>
        <div>
          <div className="div-content">
            <form
              id="login form"
              className="form-format"
              onSubmit={handleSubmit}
            >
              <h2 className="form-title">Log in:</h2>
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
              <div className="buttons-div">
                <button
                  className="button-format"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user, UI: state.UI });

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(LoginPage);
