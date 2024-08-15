import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9);


    //todo1: get the total numbers of products
    //todo2: number of items per page

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data?.result);
                setCount(data?.count)
            })
    }, [currentPage, itemsPerPage]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);
    // handle previous page
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    };
    // handle next page
    const handleNextPage = () => {
        if (currentPage < pages?.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    };
    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
                {
                    products?.map((pro) => <ProductCard key={pro?._id} item={pro}></ProductCard>)
                }
            </div>
            <div className="text-center mx-auto my-3">
                <button onClick={handlePreviousPage} className="btn hover:bg-gradient-to-br  from-gray-400 to-fuchsia-200 mx-1"><FaArrowCircleLeft /></button>
                {
                    pages?.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'btn bg-gradient-to-tl from-fuchsia-300 to-emerald-200 mx-1' : 'btn mx-1 hover:bg-gradient-to-tl from-fuchsia-300 to-emerald-200'}
                        key={page}>{page + 1}</button>)
                }
                <button onClick={handleNextPage} className="btn hover:bg-gradient-to-br  from-violet-300 to-indigo-300 mx-1"><FaArrowCircleRight /></button>
            </div>
        </>
    );
};

export default Products;