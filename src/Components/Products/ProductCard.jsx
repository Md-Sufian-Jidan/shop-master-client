import { FaStar } from "react-icons/fa6";

const ProductCard = ({ item }) => {
    const { product_name, product_category, product_image, product_price, product_ratings, product_creation_date_time, product_description, brand_name } = item || {}
    return (
        <div className="card card-compact bg-gradient-to-tr from-rose-600 to-violet-900 w-96 mx-auto shadow-xl">
            <figure>
                <img
                    className="w-56 h-32"
                    src={`${product_image ? product_image : 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}`}
                    alt="Shoes" />
            </figure>
            <div className="card-body text-lg">
                <h2 className="card-title">Product Name : {product_name}</h2>
                <p>Description : {product_description}</p>
                <p>Product Category : {product_category}</p>
                <div className=" flex items-center justify-around my-2">
                    <p>Brand Name : <span className="font-semibold">{brand_name}</span></p>
                    <p>Price : <span className="font-semibold">{product_price} $</span></p>
                </div>
                <div className=" flex items-center justify-around my-2">
                    <p>Creation Date : {new Date(product_creation_date_time).toDateString()}</p>
                    <p className="flex items-center gap-2">Rating: <span className="font-semibold flex items-center">{product_ratings}<FaStar /></span></p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;