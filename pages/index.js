
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import Dropzone from '../components/Dropzone'
import Alert from '../components/Alert'
import authContext  from '../context/auth/authContext'
import fileContext from '../context/files/fileContext'


export default function Home() {

  const { userAuth } = useContext(authContext)
  const { file_msg, url } = useContext(fileContext)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      userAuth()
    }
    // eslint-disable-next-line
  } , [])



  return (
    
    <Layout >
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32 ">
      { url ? 
      <>
        <p className="text-center font-bold">
          <span className="text-4xl font-bold text-red-700 block my-3 ">Your Link is Ready: </span>
            {`${process.env.frontURL}/links/${url}`}
          <button onClick={()=>navigator.clipboard.writeText(`${process.env.frontURL}/links/${url}`) }className="bg-gray-800 font-bold text-white block mx-auto my-3 rounded-lg py-2 px-5 hover:bg-black "> Copy Link</button>
        </p>
      </>
        :(
        <>
        {file_msg && <Alert/>}
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10  ">
            <Dropzone/>
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-3xl font-sans font-bold text-gray-800 capitalize mb-5 ">Upload and Share files privately and securely</h2>
                <p className="leading-loose text-lg">
                  <span className="text-red-500 uppercase tracking-wider font-bold">Node <strong className="text-black">Send </strong>React</span>, which includes file encryption and password protection, allows you to send files (1GB up to 2.5GB) securely. When you upload a file, Firefox Send generates a link that you can share with the recipient. For added security, you also have the option to set a password and change the expiration date settings. Files are not saved in the cloud.
                </p>
              <Link href='/create-account'>
                  <a className=" pb-3 cursor:pointer font-bold mt-5 inline-block transition-all text-red-400  hover:text-red-500">Create Account to get more benefits</a>
              </Link>
            </div>
          </div>
        </>
      )
      }
       </div>
    </Layout>
  )
}