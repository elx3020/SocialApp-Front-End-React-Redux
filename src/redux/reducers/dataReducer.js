import { act } from 'react-dom/test-utils';
import { GET_POSTS, GET_POST, SET_POST ,LOADING_DATA, LIKE_POST, UNLIKE_POST,DELETE_POST, GET_COMMENTS, LOADING_COMMENTS, CLEAR_POST,GET_POST_ONLY,SET_COMMENT} from '../types';


const initialState = {
    posts: [],
    post: {},
    comments: [],
    loading: false,
    loadingComments: false
};


export default function(state = initialState, action){
    switch(action.type){

    // post reducers
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST:
            let post = state.posts.filter(post => post.postId === action.payload)
            return{
                ...state,
                post: Object.assign({},...post),
                loading: false
            }

        case GET_POST_ONLY:
            return{
                ...state,
                post: action.payload,
                loading: false
            }
        case CLEAR_POST:
            return{
                ...state,
                post: {},
                comments: []
            }

        case SET_POST:
            
            return{
                ...state,
                posts: [action.payload,...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.postId !== action.payload),
                loading: false
            };

// comments reducers

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loadingComments: false
            }
        case SET_COMMENT:
            return {
                ...state,
                comments: [...state.comments,action.payload],
                loadingComments: false
            }


// ui reducers
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            };
        case LOADING_COMMENTS:
            return{
                ...state,
                loadingComments: true
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(post => post.postId === action.payload.postId)
            state.posts[index] = action.payload; 
            return{
                ...state
            };
        default:
            return state;
    }
    
}