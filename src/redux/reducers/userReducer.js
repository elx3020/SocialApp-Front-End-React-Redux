import {SET_USER, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED , LIKE_POST, UNLIKE_POST} from '../types';

const initialState ={
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.postId)
            }
        default:
            return state;
    }
}