
import { useState } from "react";
import PropTypes from "prop-types";



import { editUserData } from "../../redux/actions/userAction";
import { connect } from "react-redux";






const UserEditForm = (props) => {
    
    const { loading, userLocation, userWebsite, userBio } = props;

    
   
   

    const submitEditData = (event) => {
        event.preventDefault();
        const userData = {
            bio: userBio,
            website: userWebsite,
            location: userLocation
        }
        props.editUserData(userData);

        props.toggleEdit();

    }


    


    return (<div>

    <form onSubmit={submitEditData}>
    <p>Location: </p>
    <input type='text' name='location' value={userLocation} onChange={props.handleEditData}/>
    <p>Website</p>
    <input type='text' name='website' value={userWebsite} onChange={props.handleEditData}/>
    <p>bio</p>
    <textarea id="bio" name="bio" rows="3" cols="20" style={{resize:"none"}} value={userBio} onChange={props.handleEditData}>
    </textarea>
    <div>
        <button type='submit'>Save</button>
        <button onClick={props.toggleEdit}>Cancel</button>
    </div>
    </form>

</div>)
};


const mapStateToProps = (state) =>(
    {
        loading: state.user.loading
    }
)

const mapActionsToProps = {
    editUserData
}

export default connect(mapStateToProps,mapActionsToProps)(UserEditForm);