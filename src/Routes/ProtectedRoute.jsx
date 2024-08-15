import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    let location = useLocation();
    console.log(location);

    if (loading) {
        return <span className="loading loading-bars loading-2xl flex justify-center items-center"></span>;
    }
    if (user) {
        return children;
    }
};

export default ProtectedRoute;