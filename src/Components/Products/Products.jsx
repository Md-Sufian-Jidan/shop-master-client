import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaArrowCircleLeft, FaArrowCircleRight, FaCalendarAlt } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const Products = () => {

    const { user } = useAuth();

    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProducts] = useState([]);
    // pagination states
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9);


    // pagination start here
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data?.result);
                setFilterProducts(data?.result);
                setCount(data?.count)
            })
    }, [currentPage, itemsPerPage]);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);
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
    // pagination ends here

    // filter by price section start
    const price = products?.map(item => item?.product_price);
    // high to low
    const asc = price?.sort((a, b) => a - b);
    // low to high
    const des = price?.sort((a, b) => b - a);
    // high to low sort function
    const handleFilter = (filter) => {
        if (filter === des) {
            const remaining = products?.filter((item) => console.log(item?.product_price) == console.log(filter));
            const sort = remaining?.sort((rem1, rem2) => rem2?.product_price - rem1?.product_price)
            setFilterProducts(sort);
        }
    };
    // low to high sort function
    const handleLowToHigh = (filter) => {
        if (filter === asc) {
            const remaining = products?.filter((item) => console.log(item?.product_price) == console.log(filter))
            const sort = remaining?.sort((rem1, rem2) => rem1?.product_price - rem2?.product_price)
            setFilterProducts(sort);
        }
    }

    // search function by product name
    const [search, setSearch] = useState('');

    const getData = async (e) => {
        e.preventDefault()
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries?search=${search}`, { withCredentials: true });
        setFilterProducts(data);
    };

    // handle date sort 
    const handleDateSort = () => {
        const sortedProducts = [...products].sort((a, b) =>
            new Date(b.product_creation_date_time) - new Date(a.product_creation_date_time)
        );
        console.log(sortedProducts);
        setFilterProducts(sortedProducts);
    };

    return (
        <>
            {/* search by product name section */}
            <form className="max-w-xl mx-auto my-5">
                <label className="input input-bordered flex items-center gap-2 mx-10">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                        className="grow"
                        placeholder="Search" />
                    <span
                        onClick={getData}
                        className="btn bg-sky-400/60">Search</span>
                </label>
            </form>
            {/* sort by price and newest date section */}
            <div className="flex justify-between items-center ">
                <details className="dropdown">
                    <summary className="btn m-1 bg-green-500 text-white flex items-center">Sort by Price <FaMoneyBill1Wave /></summary>
                    <ul className="menu dropdown-content rounded-box z-[1] w-52 p-2 shadow bg-fuchsia-900 text-rose-500 font-semibold">
                        <li onClick={() => handleFilter(des)} className="hover:bg-violet-500 rounded-xl"><a>High To Low</a></li>
                        <li onClick={() => handleLowToHigh(asc)} className="hover:bg-violet-500 rounded-xl"><a>Low To High</a></li>
                    </ul>
                </details>
                <details className="dropdown dropdown-left">
                    <summary className="btn m-1 bg-green-500 text-white flex items-center">sort by date <FaCalendarAlt /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={handleDateSort} className="hover:bg-violet-500 rounded-xl" ><a>Newest date</a></li>
                    </ul>
                </details>
            </div>
            {/* main products section */}
            {
                user ?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
                        {
                            filterProduct?.map((pro) => <ProductCard key={pro?._id} item={pro}></ProductCard>)
                        }
                    </div> :
                    <>
                        <p className="my-5 text-center text-2xl">Login to see the products</p>
                    </>
            }
            {/* pagination section */}
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