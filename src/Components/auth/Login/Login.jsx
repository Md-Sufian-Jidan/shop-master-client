import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Login = () => {
    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { loginUser, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            return toast.error('your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Your password should contain a lower letter')
        }
        loginUser(email, password)
            .then(res => {
                if (res.user) {
                    toast.success('User Login Successfully');
                    navigate('/');
                    setLoading(false);
                }
            })
            .catch((err) => {
                toast.error(err.message)
                setLoading(false);
            })
    };
    const handleGoogleLogin = async () => {
        googleLogin()
            .then(async (res) => {
                console.log(res);
                // console.log(result.user);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName
                };
                await axiosPublic.post('/login', userInfo);
                navigate('/');
                return toast.success('User Login Successfully');
            })
            .catch((err) => {
                navigate('/');
                console.log(err);
                return toast.error(err.message);
            })
    }
    return (
        <>
            <Helmet>
                <title>shopMaster || Login</title>
            </Helmet>
            <section className="">
                <div className="container flex flex-col lg:flex-row items-center justify-center w-full p-6 m-auto mx-auto rounded-lg shadow-md bg-slate-300 dark:bg-fuchsia-200  my-5">
                    <div className="lg:w-1/2 text-purple-600">
                        <img className="w-auto h-8 sm:h-8" src={'https://i.ibb.co/8ccwLh7/shop-Master.png'} alt="" />
                        <h1 className="mt-4 md:text-lg">Welcome back</h1>
                        <h1 className="mt-4 text-2xl font-medium capitalize lg:text-3xl ">
                            login to your account
                        </h1>
                    </div>
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit} >
                            {/* <h1 className="mt-3 text-2xl font-semibold text-purple-800 capitalize sm:text-3xl ">Login</h1> */}

                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" className="block w-full py-3 text-lime-700 bg-white border rounded-lg px-11 dark:bg--300 dark:text-gray-700 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" name="email" required />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type={`${show ? 'text' : 'password'}`} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" name="password" required />
                                <span className="absolute top-4 right-3" onClick={() => setShow(!show)}>
                                    {show ?
                                        <FaEye /> :
                                        <FaEyeSlash />
                                    }
                                </span>
                            </div>

                            <div className="mt-6">
                                {
                                    loading ? <button className="w-full flex justify-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" ><VscLoading className='animate-spin' /></button> :
                                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Sign in
                                        </button>
                                }

                                <p className="mt-4 divider text-xl text-center text-indigo-700">or sign in with</p>
                                <div className="mt-6 text-center ">
                                    <Link to="/register" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                        Don’t have an account yet? Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div>
                            <button onClick={handleGoogleLogin} className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full bg-green-500">
                                <FaGoogle size={20} />
                                <span className="mx-2">Sign in with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;