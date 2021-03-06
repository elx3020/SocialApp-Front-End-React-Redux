import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router";

// styles

import "../styles/PageStyle.css";
import "../styles/ProfileStyles.css";
import "../styles/buttonsStyle.css";
// redux stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userAction";

// components
import EditUserData from "../components/profile/EditUserData";

const ProfilePage = (props) => {
  // values that are obtain from the data base, we destructured from the props object and store in variables with the same name
  const {
    credentials: { handle, createAt, location, website, bio, imageUrl },
    authenticated,
    loading,
  } = props;

  const history = useHistory();

  // edit profile state

  // component states
  const [userLocation, setUserLocation] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [userBio, setUserBio] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);

  // handle user Logout button
  const handleClick = () => {
    props.logoutUser(history);
  };

  // handle image change from the input type file element which is hidden to be handle by the buttom below
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData(); // form data allow me to send the image in combination with busboy library
    formData.append("image", image, image.name);
    props.uploadImage(formData);
    // send to server
  };

  // handle click button to update image
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  // edit user data handler

  const handleEditData = ({ target }) => {
    if (target.name === "location") {
      setUserLocation(target.value);
    } else if (target.name === "website") {
      setUserWebsite(target.value);
    } else if (target.name === "bio") {
      setUserBio(target.value);
    }
  };

  const toggleEdit = () => {
    setEditingProfile((prev) => !prev);
    if (location !== undefined) {
      setUserLocation(location);
    }
    if (website !== undefined) {
      setUserWebsite(website);
    }
    if (bio !== undefined) {
      setUserBio(bio);
    }
  };

  // styles

  // profile image, buttom and userhandle

  const profileHead = loading ? (
    <h2>Loading..</h2>
  ) : (
    <div className="profile-head">
      <div>
        <img
          src={imageUrl}
          alt="user_image"
          style={{ width: "80px", height: "auto" }}
        />
      </div>
      <input
        type="file"
        id="imageInput"
        hidden="hidden"
        onChange={handleImageChange}
      />
      <button onClick={handleEditPicture}>
        <i className="fas fa-user-edit"></i>
      </button>
      <h2>{`@${handle}`}</h2>
    </div>
  );

  const profileBody = (
    <div className="profile-body">
      <p>Joined {dayjs(createAt).format("MMM YYYY")}</p>
      {location && <p>- {location} -</p>}
      {website && <a href={website}>{website}</a>}
      {bio && <p>{bio}</p>}
      <div className="buttons-bar">
        <button className="button btn-profile" onClick={toggleEdit}>
          Edit Profile
        </button>
        <button className="button btn-profile" onClick={handleClick}>
          Log out
        </button>
      </div>
    </div>
  );

  const profileMarkup = (
    <div className="profileuser-container">
      {authenticated && !loading ? (
        <Fragment>
          {!editingProfile ? (
            <div>
              {profileHead}
              {profileBody}
            </div>
          ) : (
            <EditUserData
              userLocation={userLocation}
              userWebsite={userWebsite}
              userBio={userBio}
              toggleEdit={toggleEdit}
              handleEditData={handleEditData}
            />
          )}
        </Fragment>
      ) : (
        <h1>No user</h1>
      )}
    </div>
  );

  return (
    <div className="page-container">
      <div className="div-content">{profileMarkup}</div>
    </div>
  );
};

ProfilePage.propTypes = {
  credentials: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  authenticated: state.user.authenticated,
  loading: state.user.loading,
});

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);
