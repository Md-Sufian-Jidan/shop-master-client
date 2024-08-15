import React from 'react';
import { FaFacebook, FaGithub, } from 'react-icons/fa';
import { FaLinkedin,  } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="text-white bg-[#151414] p-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <div className=" lg:text-left text-center space-y-3 lg:w-1/2">
                    <h1 className="text-xl font-bold">
                        <img className='w-8' src="https://i.ibb.co/8ccwLh7/shop-Master.png" alt="" />shop<span className='text-green-400'>Master</span></h1>
                    <p className="font-semibold">Your one-stop destination for the best deals on the latest products. Follow us on social media for exclusive offers and updates. Shop with confidence knowing that we prioritize your satisfaction and security. Thank you for choosing ShopMaster for all your shopping needs!.</p>
                </div>
                <div className="lg:w-1/2 lg:text-right flex justify-center items-center gap-5">
                    <a href="https://github.com/Md-Sufian-Jidan" target='_blank'>
                        <FaGithub size={25} />
                    </a>
                    <a href="https://www.linkedin.com/in/md-abu-sufian-jidan" target='_blank'>
                        <FaLinkedin size={25} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100063493051408" target='_blank'>
                        <FaFacebook size={25} />
                    </a>
                </div>
            </div>
            <p className="text-center font-bold my-5">Copyright © 2024 - All right reserved by shop Master Ltd</p>
        </footer>
    );
};

export default Footer;