import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import { useRouter } from 'next/router';
import fileContext from '../context/files/fileContext';
import Image from 'next/image';

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
        <header className="p-8 pt-3 flex flex-col md:flex-row items-center justify-between">
            {/* eslint-disable-next-line  */}
            <Image 
                onClick={() => redireccionar() }
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
                alt="NodeSend"
                width={200}
                height={80}
            />

            <div>
                {
                    user ? (
                        <div className="flex items-center">
                            <p className="mr-4 font-sans text-lg">Welcome {user.name}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-2 rounded-lg sm:w-auto w-full text-white font-semibold text-xs"
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