import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaArrowCircleLeft, FaArrowCircleRight, FaCalendarAlt } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import axios from "axios";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProducts] = useState([]);
    // pagination states
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9);

    // search by brand, minPrice, maxPrice and categories states
    const [queries, setQueries] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // console.log(brand);
    // console.log(category);
    // console.log(minPrice);
    // console.log(maxPrice);


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

    // filter by price section start
    const price = products?.map(item => item?.product_price);
    // high to low
    const asc = price?.sort((a, b) => a - b);
    // low to high
    const des = price?.sort((a, b) => b - a);


    //TODO : slove the asc function
    // why it is behave like des function


    const handleFilter = (filter) => {
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

    // categories and brand name api call 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/brands_category`)
            .then(res => res.json())
            .then(data => setQueries(data))
    }, []);

    useEffect(() => {
        categorization();
    }, [brand, category, minPrice, maxPrice]);

    const categorization = () => {
        fetch(`${import.meta.env.VITE_API_URL}/categorization?brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFilterProducts(data?.products);
                if (data?.count > 0) {
                    setCount(data?.count);
                }
            })
    }

    return (
        <>
            {/* categories wise search section */}
            <div>
                <h1 className="text-center font-bold text-3xl">Product Filters</h1>
                <div className="flex justify-between items-center gap-5 my-5">
                    <div>
                        <label>Brand:</label>
                        <select className="p-2 rounded-xl" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            <option>All</option>
                            {
                                queries[0]?.brands?.map((item) => <option className="rounded-xl hover:bg-indigo-400" value={item} >{item}</option>)
                            }
                            {/* Add more brands as options */}
                        </select>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select className="p-2 rounded-xl" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {
                                queries[0]?.categories?.map((item) => <option className="rounded-xl hover:bg-indigo-400" value={item}>{item}</option>)
                            }
                            {/* Add more categories as options */}
                        </select>
                    </div>
                    <div>
                        <label>Price Range:</label>
                        <input
                            className="p-2 rounded-xl mx-1"
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            className="p-2 rounded-xl"
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-outline">Apply all</button>
                    </div>
                </div>
            </div>




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
                        <li onClick={() => handleFilter(asc)} className="hover:bg-violet-500 rounded-xl"><a>Low To High</a></li>
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
                {
                    filterProduct?.map((pro) => <ProductCard key={pro?._id} item={pro}></ProductCard>)
                }
            </div>
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