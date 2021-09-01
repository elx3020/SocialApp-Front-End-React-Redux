import axios from 'axios';
import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from '../types';




// login user
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




export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    window.location.replace("/");
}





export const editUserData = (editData) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/user',editData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}


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

