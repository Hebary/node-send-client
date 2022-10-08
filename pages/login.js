import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/auth/authContext'
import { useContext, useEffect } from 'react'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'

export default function Login() {
    
    const router = useRouter()

    const { msg, isAuth, loginUser } = useContext(authContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
           
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
        }),
        onSubmit: values => {
            loginUser(values)
        }

    })

    useEffect(() => {
        if (isAuth) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [isAuth])

  return (

    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-10">
            <h2 className="text-4xl font-sans font-bold text-gray-700 text-center my-4">Login</h2>
        </div>
        { msg && <Alert/> }
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" 
                    onSubmit={formik.handleSubmit}
                    >
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
                        <input type="submit" className=" uppercase cursor-pointer mt-4 hover:bg-red-400 bg-black text-white font-bold rounded-lg w-full py-2 px-5 leading-tight focus:outline-none tracking-wider" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}