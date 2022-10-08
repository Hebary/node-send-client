import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useContext } from 'react'
import authContext from '../context/auth/authContext'
import Alert from '../components/Alert'


export default function CreateAccount() {

    const { msg, createUser } = useContext(authContext);


    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
        }),
        onSubmit: values => {
            createUser(values);
        }

    })



  return (
    <Layout >
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-10">
            <h2 className="text-4xl font-sans font-bold text-gray-700 text-center my-4">Create Account</h2>
        </div>
            {msg && <Alert/>}

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" 
                    onSubmit={formik.handleSubmit}
                    >
                    <div className="mb-3">
                        <label className=" ml-1 block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Name
                        </label>
                        <input className="appearance-none border rounded-lg w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" 
                            value={formik.values.name} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            {formik.touched.name && formik.errors.name &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4">
                                    <p className="font-bold">Error:<span className="font-light ml-2">{formik.errors.username}</span></p>
                                    
                                </div>
                            }
                    </div>
                    <div className="mb-3">
                        <label className=" ml-1 block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input type="email" className="appearance-none border rounded-lg w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"  placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4">
                                    <p className="font-bold">Error:<span className="font-light ml-2">{formik.errors.email}</span></p>
                                    
                                </div>
                            }
                    </div>
                    <div className="mb-3">
                        <label className=" ml-1 block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none border rounded-lg w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                           {formik.touched.password && formik.errors.password &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4">
                                    <p className="font-bold">Error:<span className="font-light ml-2">{formik.errors.password}</span></p>
                                </div>
                            }
                    </div>
                    <div>
                        <input type="submit" className=" uppercase cursor-pointer mt-4 bg-red-400 hover:bg-black text-white font-bold rounded-lg w-full py-3 px-5 leading-tight focus:outline-none tracking-wider" value="Create"/>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}