import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // let location = useLocation();
    // console.log(location);

    if (loading) {
        return <span className="loading loading-bars w-52 text-rose-500 mx-auto my-36 flex justify-center items-center"></span>;
    }
    if (user) {
        return children;
    }
    // state={location?.pathname} 
    <Navigate to={'/login'} replace='true'  ></Navigate>
};

export default ProtectedRoute;