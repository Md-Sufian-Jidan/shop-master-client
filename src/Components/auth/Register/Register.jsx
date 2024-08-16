import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { imageUpload } from '../../../utils/ImageUpload';
import { VscLoading } from 'react-icons/vsc';
import toast from 'react-hot-toast';


const Register = () => {

    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // custom hooks
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const image = data.photo[0];
        const confirmPassword = data.confirmPassword;

        if (password.length < 6) {
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Your password should contain a lower letter')
        }
        if (password !== confirmPassword) {
            setLoading(false);
            return toast.error('Password and confirm password will be same')
        }

        const img_url = await imageUpload(image);

        createUser(email, password)
            .then((res) => {
                const userInfo = {
                    name: name,
                    email: email,
                    image: img_url,
                    status: 'active',
                    role: 'guest',
                    created_date: new Date().toLocaleDateString(),
                };
                axiosPublic.post('/register', userInfo)
                    .then((res) => {
                        console.log(res);
                        // toast.success('user is going to database')
                    })
                updateUserProfile(name, img_url)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        navigate('/'); // fix this before deploying your project
                        return toast.success('User Created Successfully');
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                        return toast.error(`${err.message}`);
                    })
            })
            .then((error) => {
                console.log(error);
                setLoading(false);
            })
    };
    return (
        <>
            <Helmet>
                <title>shopMaster || Sign Up</title>
            </Helmet>
            <section className="flex items-center gap-3 min-h-screen p-10 bg-contain bg-repeat-x bg-[url('https://i.ibb.co/tLgdX2x/istockphoto-182408547-612x612.jpg')]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 dark:bg-orange-800/60 p-6 max-w-3xl mx-auto rounded-xl">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-500">user Name is required</span>}

                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">Email field is required</span>}
                    </div>
                    {/* password */}
                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                        <input id="password" type={show ? "text" : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500">Password is required</span>}
                        <span className="absolute top-[45px] right-3" onClick={() => setShow(!show)}>
                            {show ?
                                <FaEye /> :
                                <FaEyeSlash />
                            }
                        </span>
                    </div>
                    {/* confirm password */}
                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input id="passwordConfirmation" type={showPassword ? "text" : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("confirmPassword", { required: true })} />
                        {errors.confirmPassword && <span className="text-red-500">Confirm Password field is required</span>}
                        <span className="absolute top-[45px] right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ?
                                <FaEye /> :
                                <FaEyeSlash />
                            }
                        </span>
                    </div>
                    {/* select image */}
                    <div>
                        <label htmlFor='image' className='block text-gray-700 dark:text-gray-200'>
                            Select Image:
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            required
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            {...register("photo", { required: true })}
                        />
                        {errors.photoURL && <span className="text-red-600">Photo is required</span>}
                    </div>

                    <div className="flex justify-center mt-6">
                        {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                            <VscLoading className=" animate-spin" size={20} />
                        </button> : <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Sign Up</button>}
                    </div>
                    <p className="text-center mt-2 text-white">All Ready Have an Account? <Link className="underline hover:scale-110" to="/login">Then Login</Link></p>
                </form>
            </section>
        </>
    );
};

export default Register;