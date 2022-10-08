import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';


import { 
    CREATE_USER_SUCCESS, 
    CREATE_USER_ERROR,
    CLEAN_ALERT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    USER_AUTH,
    USER_LOGOUT
} from '../../types';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        isAuth: null,
        user: null,
        msg: null,
        loading: null
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const createUser = async datos => {
        
        try {
            const respuesta = await axiosClient.post('api/users', datos);
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    // Autenticar Usuarios
    const loginUser = async datos => {

        try {
            const respuesta = await axiosClient.post('api/auth', datos);
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    // Retorne el Usuario autenticado en base al JWT
    const userAuth = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token)
        }

        try {
            const respuesta = await axiosClient.get('api/auth');
            if(respuesta.data.user) {
                dispatch({
                    type: USER_AUTH,
                    payload: respuesta.data.user
                }) 
            }

        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Cerrar la sesión
    const logOut = () => {
        dispatch({
            type: USER_LOGOUT
        })
    }

    return (
        <authContext.Provider
            value={{ 
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                createUser,
                loginUser,
                userAuth, 
                logOut
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;