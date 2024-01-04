import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import toast from "react-hot-toast";

import { productUnits } from "../../data/productUnits"

export default function CreateProduct() {

    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("");
    const [openingStock, setOpeningStock] = useState(0);

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const productData = {
                productName, price, unit, openingStock,
                currentStock: openingStock
            }
            const response = await fetch(`http://localhost:3000/api/v1/product/create`, {
                method: 'POST',
                body: JSON.stringify(productData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            const data = await response.json();
            if (data.success) {
                toast.success("Product added successfully.")
                return navigate("/list/product");
            } else {
                toast.error("Failed to create product!")
                return false;
            }

        } catch (error) {
            console.log(error, "create product handler");
            return null;
        }
    }


    return (
        <div>

            <p className="text-xl text-rose-500 my-1">Create new product</p>

            <form onSubmit={submitHandler}
                className="max-w-3xl m-auto gap-4 flex flex-col items-center my-4 shadow-md shadow-slate-500 p-8"
            >

                {/* name and unit */}
                <div className="flex w-full items-center justify-between gap-8">

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="p-[6px] rounded text-black outline-none"
                            placeholder="Enter product name"
                            onChange={e => setProductName(e.target.value)}
                            value={productName}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="unit" className="after:content-['*'] after:ml-0.5 after:text-red-500">Unit</label>
                        <select
                            name="unit"
                            required
                            className="p-[6px] px-4 rounded text-black outline-none"
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

                </div>


                {/* price and stock */}
                <div className="flex w-full items-center justify-between gap-8">

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            required
                            className="p-[6px] rounded text-black outline-none"
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="openingStock">Opening Stock</label>
                        <input
                            type="number"
                            name="openingStock"
                            required
                            className="p-[6px] rounded text-black outline-none"
                            onChange={e => setOpeningStock(e.target.value)}
                            value={openingStock}
                        />
                    </div>

                </div>



                <button className="bg-blue-700 p-2 px-6 mt-4 rounded outline-none hover:bg-blue-500">Add</button>


            </form>

        </div>
    )
}