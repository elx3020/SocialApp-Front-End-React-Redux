import {
  GET_POSTS,
  SET_POST,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  GET_POST,
  LOADING_COMMENTS,
  GET_COMMENTS,
  CLEAR_POST,
  GET_POST_ONLY,
  SET_COMMENT
} from "../types";
import axios from "axios";

// get posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: [],
      });
    });
};

// get post

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({type: CLEAR_POST});
    dispatch({type: GET_POST,
              payload: postId}); 
};

// if user gets directly to the post or refresh the page, we get only the post data

export const getOnlyPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
  .get(`/post/${postId}`)
  .then(res => {
    dispatch({type: GET_POST_ONLY,
              payload: res.data
            });
  })
  .catch(err => console.log(err));
}


// get post with details

export const getComments = (postId) => (dispatch) => {
  dispatch({type: LOADING_COMMENTS});
  axios
  .get(`/post/details/${postId}`)
  .then((res) => {
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}

// make a comment 

export const postComment = (postId,postData) => (dispatch) => {
  dispatch({type:LOADING_COMMENTS});
  axios
  .post(`/post/${postId}/comment`,postData)
  .then(res => {
    dispatch({type: SET_COMMENT,
              payload: res.data})
  })
  .catch(err => console.log(err))

}



// publish a new post

export const setPost = (postData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/post", postData)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete posts

export const deletePost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => {
      console.log(err);
    });
};

// like post

export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// unlike post

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
