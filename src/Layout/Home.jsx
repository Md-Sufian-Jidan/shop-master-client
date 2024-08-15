import { Outlet } from "react-router-dom";
import Footer from "../Components/Sharder/Footer/Footer";
import Navbar from "../Components/Sharder/Navbar/Navbar";
import { Helmet } from "react-helmet";

const Home = () => {

    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>shopMaster || Home</title>
            </Helmet>
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