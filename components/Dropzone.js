import React, {  useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosClient from '../config/axios';
import authContext from '../context/auth/authContext';
import fileContext from '../context/files/fileContext';
import Form from './Form';

const Dropzone = () => {

    // Context de la app
    const { loading, showAlert, uploadFile, createLink} = useContext(fileContext);

    // Context de autenticación
    const { user, isAuth } = useContext(authContext);

    const onDropRejected = () => {
        showAlert('Sorry, limit is 1MB, get a free account to increase it');
    }

    const onDropAccepted = useCallback( async (acceptedFiles) => {
        // Crear un form Data
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        uploadFile(formData, acceptedFiles[0].path);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const maxSize = isAuth ? 1000000000000 : 1000000;

    // Extraer contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize});

    const files = acceptedFiles.map( file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{file.path}</p> 
            <p className="text-sm text-gray-500">{ (file.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ) );




    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex rounded-lg flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">

            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-light text-center mb-4">Files</h4>
                    <ul>
                        {files}
                    </ul>

                    {
                        isAuth ? <Form /> : ""
                    }

                    { loading ? <p className="my-10 text-center text-gray-600">Uploading file...</p> : (
                        <button
                            type="button"
                            className="bg-blue-800 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-900"
                            onClick={ () => createLink() }
                        >
                            Create Link
                        </button>
                    )}


                </div>

            ) : (
                <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                    <input className="h-100 " { ...getInputProps() } />
                        {
                            isDragActive ? <p className="text-2xl text-center text-gray-600">Drop the file </p> :
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Drag a file and drop it here</p>
                                <button className="bg-blue-700 w-2/3 py-3 rounded-lg text-white my-10 hover:bg-blue-800 transition-colors duration-300" type="button">
                                    Select files to upload
                                </button>
                            </div>
                        }
                </div>
            ) }
        </div>
     );
}
 
export default Dropzone;