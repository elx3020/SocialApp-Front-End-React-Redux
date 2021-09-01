import { GET_POSTS, GET_POST, SET_POST ,LOADING_DATA, LIKE_POST, UNLIKE_POST,DELETE_POST} from '../types';


const initialState = {
    posts: [],
    post: {},
    loading: false
};


export default function(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST:
            return{
                ...state,
                post: action.payload,
                loading: false
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
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            };
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