import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { logout, user } = useAuth();
    console.log(user);

    const navLinks = <>
        <NavLink className={({ isActive }) => isActive ? "p-3 border-0 border-b-2 border-b-pink-500 mr-2 font-bold" : "p-3 mr-2"} to={'/'}>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? "p-3 border-0 border-b-2 border-b-pink-500 mr-2 font-bold" : "p-3 mr-2"} to={'/all-products'}>All Products</NavLink>
    </>


    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('User Logout Successfully')
            })
    }
    return (
        <div className="navbar fixed max-w-7xl mx-auto bg-red-100 rounded-xl z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link to={'/'} className="text-xl flex">
                    <img className='w-8 rounded-full' src="https://i.ibb.co/8ccwLh7/shop-Master.png" alt="" />
                    shop<span className='text-green-400'>Master</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            title='user photo'
                            alt="Tailwind CSS Navbar component"
                            src={`${user ? user?.photoURL : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}`} />
                    </div>
                </div>
                <div>
                    {
                        user ? <button onClick={handleLogout} className="btn bg-red-600 text-white">Log Out</button> : <Link to={'/login'} className="btn bg-green-400 text-white">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;