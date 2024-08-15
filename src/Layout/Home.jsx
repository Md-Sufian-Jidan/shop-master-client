import { Outlet } from "react-router-dom";
import Footer from "../Components/Sharder/Footer/Footer";
import Navbar from "../Components/Sharder/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <div className="h-20">
                <Navbar />
            </div>
            <div className="min-h-[calc(100vh-337px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Home;