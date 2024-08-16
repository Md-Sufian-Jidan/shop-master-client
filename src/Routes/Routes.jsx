import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home";
import Login from "../Components/auth/Login/Login";
import Register from "../Components/auth/Register/Register";
import Error from "../Components/Error/Error";
import Products from "../Components/Products/Products";
import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "../Components/Products/AllProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        // element: <ProtectedRoute><Home /></ProtectedRoute>,
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Products />
            },
            {
                path: '/all-products',
                element: <AllProducts />
            }
        ]
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