import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action._payload
            };
        default:
            return state;

    }
}
