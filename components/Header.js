import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import { useRouter } from 'next/router';
import fileContext from '../context/files/fileContext';


const Header = () => {

    // routing 
    const router = useRouter();

      // Extraer el user autenticado del Storage 
    const AuthContext = useContext( authContext );
    const { user, userAuth,  logOut} = AuthContext;

      // Context de la aplicación
    const { cleanState } = useContext( fileContext );

    useEffect(() => {
        userAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redireccionar = () => {
        router.push('/');
        cleanState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            {/* eslint-disable-next-line  */}
            <img 
                onClick={() => redireccionar() }
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
                alt="NodeSend"
            />

            <div>
                {
                    user ? (
                        <div className="flex items-center">
                            <p className="mr-4">Welcome {user.name}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={() => logOut() }
                            >Log out</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Log in</a>
                            </Link>
                            <Link href="/create-account">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Create Account</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
     );
}
 
export default Header;