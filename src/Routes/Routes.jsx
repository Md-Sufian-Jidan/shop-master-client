import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);