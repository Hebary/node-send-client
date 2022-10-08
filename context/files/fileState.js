import React, {useReducer} from 'react';
import fileContext from './fileContext';
import fileReducer from './fileReducer';
import {
    SHOW_ALERT,
    CLEAN_ALERT,
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    LINK_CREATED_ERROR,
    LINK_CREATED_SUCCESS,
    CLEAN_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../../types';


import axiosClient from '../../config/axios';

const FileState = ({children}) => {

    const initialState = {
        file_msg: null,
        name: '',
        original_name:'',
        loading: null,
        downloads: 1,
        password: '',
        autor: null,
        url: ''
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(fileReducer, initialState);

    // Muestra una alerta 
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    // Sube los archivos al servidor
    const uploadFile = async (formData, nombreArchivo) => {
        
        dispatch({
            type: FILE_UPLOAD
        })

        try {
            const resultado = await axiosClient.post('/api/files', formData);

            dispatch({
                type: FILE_UPLOAD_SUCCESS,
                payload: {
                    name: resultado.data.file,
                    original_name: nombreArchivo
                }
            })

        } catch (error) {
            // console.log(error);
            dispatch({
                type: FILE_UPLOAD_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // crea un enlace una vez que se subió el archivo
    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await axiosClient.post('api/links', data);
            dispatch({
                type: LINK_CREATED_SUCCESS,
                payload: resultado.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }


    // Agregue el password
    const addPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    // agrega un número de downloads
    const agregarDescargas = downloads => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: downloads
        })
    }

    

    return (
        <fileContext.Provider
            value={{
                file_msg: state.file_msg,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                autor: state.autor,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                cleanState,
                addPassword,
                agregarDescargas
            }}
        >
            {children}
        </fileContext.Provider>
    )
}

export default FileState;