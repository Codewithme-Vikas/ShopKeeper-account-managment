import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import toast from "react-hot-toast";

import { getProduct } from "../../services/operations/product";
import { productUnits } from "../../data/productUnits";

export default function UpdateProduct({ id }) {

    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("");
    const [currentStock, setCurrentStock] = useState(0);
    const [addStock, setAddStock] = useState(0);

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const productData = {
                id, productName, price, unit, addStock
            }
            const response = await fetch(`http://localhost:3000/api/v1/product/update`, {
                method: 'PUT',
                body: JSON.stringify(productData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            const data = await response.json();
            if (data.success) {
                toast.success("product updated successfully!");
                return navigate("/list/product");
            } else {
                toast.error("Failed to update toast!")
                return false;
            }

        } catch (error) {
            console.log(error, "update product handler");
            return null;
        }
    }


    async function fetchProductData(productId) {
        const productData = await getProduct(productId);
        if (productData) {
            setPrice(productData.price);
            setProductName(productData.productName)
            setUnit(productData?.unit);
            setCurrentStock(productData?.currentStock);
        }
        return;
    }

    useEffect(() => {
        fetchProductData(id);
    }, []);

    return (
        <div>

            <p className="text-lg text-rose-500 my-1">Update product details...</p>

            <form onSubmit={submitHandler} className="flex gap-6 flex-wrap items-center my-4 border py-8 px-4">

                {/* name */}
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="productName">Name</label>
                    <input
                        type="text"
                        name="productName"
                        className="p-1 rounded text-black outline-none"
                        onChange={e => setProductName(e.target.value)}
                        value={productName}
                    />
                </div>

                {/* price */}
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                    />
                </div>

                {/* unit */}
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="unit">Unit</label>
                    <select
                        name="unit"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={e => setUnit(e.target.value)}
                        value={unit}
                    >
                        <option value="" disabled>Choose an option</option>
                        {
                            productUnits.map((ele, index) => (
                                <option value={ele} key={index}>{ele}</option>

                            ))
                        }
                    </select>
                </div>

                {/* current stock */}
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="currentStock">Current Stock</label>
                    <input
                        type="number"
                        name="currentStock"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={e => setCurrentStock(e.target.value)}
                        readOnly
                        value={currentStock}
                    />
                </div>



                {/* add stock */}
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="addStock">Add Stock</label>
                    <input
                        type="number"
                        name="addStock"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={e => setAddStock(e.target.value)}
                        value={addStock}
                    />
                </div>



                <button className="bg-blue-700 p-2 px-6 rounded outline-none hover:bg-blue-500 text-white">Update</button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-rose-700 p-2 px-6 rounded outline-none hover:bg-rose-500 text-white"
                >
                    Cancle
                </button>


            </form>

        </div>
    )
}