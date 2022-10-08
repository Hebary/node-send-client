 import React, { useContext} from 'react';
 import authContext from '../context/auth/authContext';
import fileContext from '../context/files/fileContext';

 const Alert = () => {

    // Extraer mensaje de error para Usuarios
    const { msg } = useContext(authContext);

    // Extraer el mensaje de error de archivos
    const { file_msg } = useContext( fileContext );

     return ( 
         <div className="bg-gray-800 py-2 px-3 w-full my-3 max-w-lg text-center font-black text-white mx-auto">
             { msg || file_msg }
         </div>
      );
 }
  
 export default Alert;