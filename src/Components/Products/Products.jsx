import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import axios from "axios";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProducts] = useState([]);

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
                setFilterProducts(data?.result);
                setCount(data?.count)
            })
    }, [currentPage, itemsPerPage]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);
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

    // filter section start
    const price = products?.map(item => item?.product_price);
    // console.log(price);
    // high to low
    const asc = price?.sort((a, b) => a - b);
    // console.log(asc);
    // low to high
    const des = price?.sort((a, b) => b - a);
    // console.log(des);

    // low to high
    const handleFilter = (filter) => {
        console.log(price);
        console.log(asc);

        if (filter === des) {
            const remaining = products?.filter((item) => console.log(item?.product_price) == console.log(filter));
            // console.log(remaining);
            const sort = remaining?.sort((rem1, rem2) => rem2?.product_price - rem1?.product_price)
            // console.log(sort);
            setFilterProducts(sort);
        }
        else if (filter === asc) {
            const remaining = products?.filter((item) => console.log(item?.product_price) == console.log(filter))
            const sort = remaining?.sort((rem1, rem2) => rem1?.product_price - rem2?.product_price)
            console.log(sort);
            setFilterProducts(sort);
        }
    };

    // handle date sort 
    const handleDateSort = () => {
        const sortedProducts = [...products].sort((a, b) =>
            new Date(b.product_creation_date_time) - new Date(a.product_creation_date_time)
        );
        console.log(sortedProducts);
        setFilterProducts(sortedProducts);
    }

    // search functionality
    // const [queries, setQueries] = useState();
    const [search, setSearch] = useState('');
    // useEffect(() => {
    //     getData()
    // }, []);

    const getData = async (e) => {
        e.preventDefault()
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries?search=${search}`, { withCredentials: true });
        setFilterProducts(data);
    };

    return (
        <>
            {/* search bar */}
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

            <div className="flex justify-between items-center ">
                <details className="dropdown">
                    <summary className="btn m-1 bg-green-500 text-white">Sort by Price <FaArrowDown /></summary>
                    <ul className="menu dropdown-content rounded-box z-[1] w-52 p-2 shadow bg-fuchsia-900 text-rose-500 font-semibold">
                        <li onClick={() => handleFilter(des)} className="hover:bg-violet-500 rounded-xl"><a>High To Low</a></li>
                        <li onClick={() => handleFilter(asc)} className="hover:bg-violet-500 rounded-xl"><a>Low To High</a></li>
                    </ul>
                </details>
                <details className="dropdown dropdown-left">
                    <summary className="btn m-1">sort by date</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={handleDateSort}><a>Newest date</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </details>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
                {
                    filterProduct?.map((pro) => <ProductCard key={pro?._id} item={pro}></ProductCard>)
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