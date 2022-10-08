import {
    SHOW_ALERT,
    CLEAN_ALERT,
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    LINK_CREATED_SUCCESS,
    LINK_CREATED_ERROR,
    CLEAN_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                file_msg: action.payload
            }
        case CLEAN_ALERT:
            return {
                ...state,
                file_msg: null
            }
        case FILE_UPLOAD:
            return {
                ...state,
                loading: true,
            }
        case FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                 name: action.payload.name,
                 original_name: action.payload.original_name,
                 loading: null,
            }
        case FILE_UPLOAD_ERROR:
            return {
                ...state,
                file_msg: action.payload,
                loading: null,
            }
        case LINK_CREATED_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case CLEAN_STATE:
            return {
                ...state,
                file_msg: null,
                original_name:'',
                name: '',
                loading: null,
                downloads: 1,
                password: '',
                autor: null,
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state
    }
}