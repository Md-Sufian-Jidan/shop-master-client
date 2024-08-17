import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
// import toast from 'react-hot-toast';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';

const AllProducts = () => {
    const { loading, user } = useAuth();

    // search by brand, minPrice, maxPrice and categories states
    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProducts] = useState([]);
    const [queries, setQueries] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        categorization()
    }, [category, brand]);

    // search by category and brand name
    const categorization = () => {
        fetch(`${import.meta.env.VITE_API_URL}/categorization?category=${category}&brand=${brand}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
                setFilterProducts(data);
            });
    };
    // handle reset button
    const handleReset = async () => {
        setBrand('');
        setCategory('');
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`, { withCredentials: true });
        setProducts(data);
    };

    // handle Price sort
    // const handlePriceSort = () => {
    //     fetch(`${import.meta.env.VITE_API_URL}/price?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //             // toast.success('price sort get')
    //             return setProducts(data)
    //         });
    // };
    // categories and brand name api call 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/brands_category`)
            .then(res => res.json())
            .then(data => setQueries(data));
    }, []);


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

    // handle date sort 
    const handleDateSort = () => {
        const sortedProducts = [...products].sort((a, b) =>
            new Date(b.product_creation_date_time) - new Date(a.product_creation_date_time)
        );
        console.log(sortedProducts);
        setFilterProducts(sortedProducts);
    };

    if (loading) {
        return <span className="loading loading-bars w-52 text-rose-500 mx-auto my-36 flex justify-center items-center"></span>;
    }

    return (
        <>
            {/* categories wise search section */}
            <div>
                <h1 className="text-center font-bold text-3xl">Product Filters</h1>
                <div className="flex justify-around items-center gap-1 my-5">
                    <div>
                        <label className='mr-1'>Brand:</label>
                        <select className="p-2 rounded-xl border" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            <option>All</option>
                            {
                                queries[0]?.brands?.map((item) => <option className="rounded-xl hover:bg-indigo-400" value={item} >{item}</option>)
                            }
                            {/* Add more brands as options */}
                        </select>
                    </div>
                    <div>
                        <label className='mr-1'>Category:</label>
                        <select className="p-2 rounded-xl border" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {
                                queries[0]?.categories?.map((item) => <option
                                    onChange={categorization} className="rounded-xl hover:bg-indigo-400" value={item}>{item}</option>)
                            }
                            {/* Add more categories as options */}
                        </select>
                    </div>
                    {/* price range filter */}
                    <div>
                        <button onClick={handleReset} className="btn btn-outline">Reset</button>
                    </div>
                </div>
            </div>
            {/* <div className='lg:flex justify-around items-center gap-3 my-5'> */}
            {/* min price input */}
            {/* <div className='my-2'>
                    <label className='mr-1'>Minimum Price: </label>
                    <input
                        className="input input-bordered"
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div> */}
            {/* MAX price input */}
            {/* <div>
                    <label>Maximum Price: </label>
                    <input
                        className="input input-bordered"
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div> */}
            {/* <div>
                    <button onClick={handlePriceSort} className='p-3 rounded-xl bg-lime-300/50'>Click to Filter</button>
                </div> */}
            {/* </div> */}
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
            {
                user ?
                    <div className="overflow-x-auto my-5">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product image</th>
                                    <th>Product Name</th>
                                    <th>Product Category</th>
                                    <th>Product Brand</th>
                                    <th>Product Price</th>
                                    <th>Product Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    filterProduct?.map((item, idx) => {
                                        return (
                                            <tr key={item?._id}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={item?.product_image}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item?.product_name}</td>
                                                <td>{item?.product_category}</td>
                                                <th>{item?.brand_name}</th>
                                                <th>{item?.product_price}</th>
                                                <td>{item?.product_description}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='text-center text-2xl my-3'>Login To See the products</p>
            }
        </>
    );
};

export default AllProducts;