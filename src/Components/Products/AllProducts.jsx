import React, { useEffect, useState } from 'react';

const AllProducts = () => {

    // search by brand, minPrice, maxPrice and categories states
    const [products, setProducts] = useState([]);
    const [queries, setQueries] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // console.log(brand);
    // console.log(category);
    // console.log(minPrice);
    // console.log(maxPrice);
    // const handleFilter = () => {
    //     fetch(`${import.meta.env.VITE_API_URL}/all-products`)
    //         .then(res => res.json())
    //         .then(data => setQueries(data));
    // }

    useEffect(() => {
        categorization();
    }, [brand, category, minPrice, maxPrice]);

    const brandNameCategories = () => {
        fetch(`${import.meta.env.VITE_API_URL}/categorization?brand=${brand}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
            })
    }

    const categorization = () => {
        fetch(`${import.meta.env.VITE_API_URL}/categorization?category=${category}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
            })
    }
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categorization?min_price=${minPrice}&maxPrice=${maxPrice}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
            })
    }, [minPrice, maxPrice]);

    // categories and brand name api call 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/brands_category`)
            .then(res => res.json())
            .then(data => setQueries(data));
    }, []);
    //all products api
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}/products`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setProducts(data?.result);
    //             console.log(data?.result);
    //         })
    // }, []);

    return (
        <div>
            {/* categories wise search section */}
            <div>
                <h1 className="text-center font-bold text-3xl">Product Filters</h1>
                <div className="flex justify-between items-center gap-5 my-5">
                    <div>
                        <label>Brand:</label>
                        <select className="p-2 rounded-xl" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            <option>All</option>
                            {
                                queries[0]?.brands?.map((item) => <option onClick={brandNameCategories} className="rounded-xl hover:bg-indigo-400" value={item} >{item}</option>)
                            }
                            {/* Add more brands as options */}
                        </select>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select className="p-2 rounded-xl" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {
                                queries[0]?.categories?.map((item) => <option onClick={categorization} className="rounded-xl hover:bg-indigo-400" value={item}>{item}</option>)
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
                        <button className="btn btn-outline">Reset</button>
                    </div>
                </div>
            </div>
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
                            products?.map((item, idx) => {
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
        </div>
    );
};

export default AllProducts;