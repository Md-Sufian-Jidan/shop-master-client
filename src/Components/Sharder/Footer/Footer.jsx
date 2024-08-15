import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-white bg-[#151414] p-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <div className=" lg:text-left text-center space-y-3 lg:w-1/2">
                    <h1 className="text-xl font-bold">shop<span className='text-green-400'>Master</span></h1>
                    <p className="font-semibold">Explore boundless creativity and express your artistic vision with Your Creative Haven. Discover curated collections of paintings, drawings, tutorials, and more, and embark on a journey of inspiration and self-expression.</p>
                </div>
                <div className="lg:w-1/2 lg:text-right flex justify-center items-center gap-5">
                    <FaGithub size={25} />
                    <FaGoogle size={25} />
                    <FaFacebook size={25} />
                </div>
            </div>
            <p className="text-center font-bold my-5">Copyright © 2024 - All right reserved by Crafts House Ltd</p>
        </footer>
    );
};

export default Footer;