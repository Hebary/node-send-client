import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import React, {useState, useContext, useEffect } from 'react';
import FileContext from '../../context/files/fileContext';
import Alert from '../../components/Alert';
// import appContext from '../../context/app/appContext';
// import Alerta from '../../components/Alerta';



export async function getServerSideProps({params}) {
    const { link } = params;

    return {
        props: {
            link:  link
        }
    }
}

export async function getServerSidePaths() {
        const links = await axiosClient.get('/api/links');
        return {
            paths: links.data.links.map( link => ( {
                params: { link : link.url }
            })),
            fallback: false
        }
}



// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line react/display-name
export default ({link}) => {

    // Context de la app
    const {  file_msg, showAlert } = useContext(FileContext);
    
    const [fileToDownload, setFileToDownload] = useState("");
    const [password, setPassword] = useState('');
    const [ tienePassword, setTienePassword ] = useState(false);
    const [url, setUrl] = useState('');
    
    const getLink  = async (link) => {
        try {
            const result = await axiosClient.get(`/api/links/${link}`);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const handleLink = async () => {
            const  data   = await getLink(link);
            setFileToDownload(data.link.name);
            setUrl(data.link.url);
            if(data.link.password){
                setTienePassword(true);
            }
        }    
        handleLink();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
   
   

    const checkPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const result = await axiosClient.post(`/api/links/${url}`, data);
            if(result.data.link){
                setTienePassword(null);
            }
            setFileToDownload(result.data.link.name);
        } catch (error) {
            showAlert(error.response.data.msg);
        }
    }



    return (
        <Layout>
            {
                tienePassword  ? (
                    <>
                        <p className="text-center text-gray-700 my-2 font-semibold">The link is protected by password, put it behind</p>

                        { file_msg && <Alert /> }
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => checkPassword(e) }
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password del link"
                                            value={password}
                                            onChange={ e => setPassword(e.target.value) }
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        className="bg-red-500 cursor-pointer hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validate password"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Download your file:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${process.env.backendURL}/api/files/${fileToDownload}`} 
                                className="bg-red-600 text-center px-10 py-2 rounded uppercase font-bold text-white cursor-pointer"
                                download    
                            >Here</a>
                        </div>
                    </>
                )
            }

        </Layout>
    )
}