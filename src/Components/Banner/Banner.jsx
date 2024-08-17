
const Banner = () => {
    return (
        <div
            className="hero h-[500px] lg:my-10 my-5"
            style={{
                backgroundImage: "url(https://i.ibb.co/3C6Xdb7/images-13.jpg)",
            }}>
            <div className="hero-overlay bg-cover"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-screen-md">
                    <h1 className="mb-5 text-5xl font-bold">Discover Our Exclusive Collection</h1>
                    <p className="mb-5">
                        Explore a wide range of top-quality products, handpicked just for you. From the latest electronics to stylish accessories, we have everything you need to enhance your lifestyle. Shop now and enjoy unbeatable prices on our curated selection!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;