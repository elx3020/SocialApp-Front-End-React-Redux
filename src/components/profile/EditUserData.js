import PropTypes from "prop-types";

// styles
import "../../styles/ProfileStyles.css";
import "../../styles/buttonsStyle.css";
import { editUserData } from "../../redux/actions/userAction";
import { connect } from "react-redux";

const UserEditForm = (props) => {
  const { userLocation, userWebsite, userBio } = props;

  const submitEditData = (event) => {
    event.preventDefault();
    const userData = {
      bio: userBio,
      website: userWebsite,
      location: userLocation,
    };
    props.editUserData(userData);

    props.toggleEdit();
  };

  return (
    <div>
      <form className="profile-body body-form" onSubmit={submitEditData}>
        <p>Location: </p>
        <input
          type="text"
          name="location"
          value={userLocation}
          onChange={props.handleEditData}
        />
        <p>Website:</p>
        <input
          type="text"
          name="website"
          value={userWebsite}
          onChange={props.handleEditData}
        />
        <p>Bio:</p>
        <textarea
          id="bio"
          name="bio"
          rows="3"
          cols="20"
          style={{ resize: "none" }}
          value={userBio}
          onChange={props.handleEditData}
        ></textarea>
        <div className="buttons-bar">
          <button className="button btn-profile" type="submit">
            Save
          </button>
          <button className="button btn-profile" onClick={props.toggleEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

UserEditForm.propTypes = {
  editUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

const mapActionsToProps = {
  editUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(UserEditForm);
