import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }, [])
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
            {
                products?.map((pro) => <ProductCard key={pro?._id} item={pro}></ProductCard>)
            }

        </div>
    );
};

export default Products;