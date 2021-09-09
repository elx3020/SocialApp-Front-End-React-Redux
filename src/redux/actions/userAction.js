import axios from 'axios';
import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from '../types';




// login user
// pair with login handler
export const loginUser = (userData , history) => (dispatch) => {
    dispatch({ type: LOADING_UI });  
    axios.post('/login',userData)
            .then(res =>{
                // console.log(res.data);
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({type: CLEAR_ERRORS}); 
                // setLoading(false);
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
                // setErrors(err.response.data);
                // setLoading(false);
                });
};


// pair with signup handler


export const signUpUser = (newUserData , history) => (dispatch) => {
    dispatch({ type: LOADING_UI });  
    axios.post('/signUp',newUserData)
            .then(res =>{
                // console.log(res.data);
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({type: CLEAR_ERRORS}); 
                // setLoading(false);
                history.push('/'); // redirect to home
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
                // setErrors(err.response.data);
                // setLoading(false);
                });
};


// logout user of web app
// declaring as an action to keep track of the event with redux
// we call this function automatically when the token has expired or if the user decide to log out


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken'); // we remove the expired token from local storage
    delete axios.defaults.headers.common['Authorization']; //we delete the authorization header
    dispatch({type: SET_UNAUTHENTICATED}); //we dispatch the action
    window.location.replace("/"); // finally we redirect the user to the homepage
}



// uses the add User Details
// ! Protected Route

export const editUserData = (editData) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/user',editData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}




// uses the upload image handler
// ! Protected Route

export const uploadImage = (formData) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/user/image',formData)
        .then(()=>{
            dispatch(getUserData());
        })
        .catch(err=> console.log(err));
}



// we have to set the user data any time the data of the user change
export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err =>{
            console.error(err)
        });

}




const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken;

}

