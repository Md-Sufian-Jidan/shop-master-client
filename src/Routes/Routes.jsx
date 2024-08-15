import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home";
import Login from "../Components/auth/Login/Login";
import Register from "../Components/auth/Register/Register";
import Error from "../Components/Error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);