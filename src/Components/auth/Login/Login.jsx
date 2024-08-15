import React from 'react';
import { Helmet } from 'react-helmet';
import { FaGoogle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Login = () => {
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
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="flex items-center pt-4 space-x-1 mx-3">
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                            <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        </div>
                        <div className='flex btn  my-3 mx-5 text-white text-xl bg-green-500 hover:bg-green-600'>
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