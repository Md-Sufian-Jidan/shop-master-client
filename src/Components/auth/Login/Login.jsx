import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { loginUser, googleLoginUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value
        const password = form.password.value;
        loginUser(email, password)
            .then((res) => {
                setLoading(false);
                console.log(res.user);
                navigate('/');
                return toast.success('user Login Successfully');
            })
            .then((err) => {
                setLoading(false);
                console.log(err);
                navigate('/');
                return toast.error('something went wrong');
            })
    }

    const handleGoogleLogin = () => {
        // e.preventDefault();
        setLoading(true);
        // const form = e.target;
        // const email = form.email.value;
        // const password = form.password.value;
        googleLoginUser()
            .then((res) => {
                setLoading(false);
                console.log(res.user);
                navigate('/');
                return toast.success('User Login successfully');
            })
            .then((err) => {
                setLoading(false);
                navigate('/');
                return toast.error(err?.message);
            })
    }
    return (
        <>
            <Helmet>
                <title>shopMaster || Login</title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center max-w-3xl lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Create your account today and start exploring the best deals on ShopMaster!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={show ? "text" : "password"} placeholder="password" className="input input-bordered" name='password' required />
                                <span className="absolute top-[50px] right-3" onClick={() => setShow(!show)}>
                                    {show ?
                                        <FaEye /> :
                                        <FaEyeSlash />
                                    }
                                </span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="flex justify-center mt-6">
                                {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                                    <VscLoading className=" animate-spin" size={20} />
                                </button> : <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Sign Up</button>}
                            </div>
                        </form>
                        <div className="flex items-center pt-4 space-x-1 mx-3">
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                            <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        </div>
                        <div onClick={handleGoogleLogin} className='flex btn  my-3 mx-5 text-white text-xl bg-green-500 hover:bg-green-600'>
                            <FaGoogle size={20} />
                            Google
                        </div>
                        <p className='mx-5 mb-5'>Do not Have An Account? <Link className="underline" to="/register">Register One</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;