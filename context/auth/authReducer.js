import { 
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    CLEAN_ALERT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    USER_AUTH,
    USER_LOGOUT
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case CREATE_USER_SUCCESS:
        case CREATE_USER_ERROR:
        case LOGIN_USER_ERROR:
            return {
                ...state,
                msg: action.payload
            }       
        case LOGIN_USER_SUCCESS: 
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                isAuth: true
            }
        case CLEAN_ALERT:
            return {
                ...state,
                msg: null
            } 
        case USER_AUTH:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        case USER_LOGOUT: 
            localStorage.removeItem('token');
            return {
                ...state,
                user: null, 
                token: null,
                isAuth: null,

            }
        default:
            return state;
    }
}