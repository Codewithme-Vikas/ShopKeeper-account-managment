import { useEffect, useState } from "react";

export default function SelectProduct({ products, setSelectedProducts }) {

    const [entryData, setEntryData] = useState({ id: "", quantity: "" });

    async function sumbitHanlder(e) {
        e.preventDefault();
        setSelectedProducts(prev => ([...prev, entryData]))
        setEntryData({ id: "", quantity: "" });
    }

    function changeHandler(e) {
        setEntryData(prevData => {
            // return the object with previous field(data) and update target field
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <form onSubmit={sumbitHanlder} className="flex gap-6 shadow-sm shadow-blue-100 p-2 pb-4">

            <div className="flex gap-2 items-center justify-center">
                <label htmlFor="id">Product</label>
                <select
                    name="id"
                    required
                    value={entryData.id}
                    onChange={changeHandler}
                    className="p-2 px-4 rounded text-black outline-none"
                >
                    <option value="" disabled>
                        Choose an product
                    </option>
                    {
                        products?.map((product) => {
                            return (
                                <option value={product._id} key={product._id}>{product.productName}{"   "}{`(Rs. ${product.price})`}</option>
                            )
                        })
                    }
                </select>
            </div>


            <div className="flex gap-2 items-center justify-center">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    required
                    value={entryData.quantity}
                    onChange={changeHandler}
                    className="p-1 rounded text-black outline-none"
                />
            </div>

            <button className="rounded p-2 px-6 bg-slate-600">Add</button>
        </form>
    )
}