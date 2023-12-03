import { useEffect, useState } from "react";
import { getProduct } from "../../services/operations/product";

export default function SelectProduct({ isSellOrder, products, setSelectedProducts }) {

    const [selectedProduct, setSelectedProduct] = useState("");

    const [entryData, setEntryData] = useState({
        product: "", quantity: 0, height: 0, width: 0,
    });

    async function sumbitHanlder(e) {
        e.preventDefault();
        setSelectedProducts(prev => ([...prev, entryData]))
        setEntryData({ product: "", quantity: "", height: "", width: "" });
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

    async function fetchProduct(productId) {
        const productData = await getProduct(productId);
        if (productData) {
            setSelectedProduct(productData);
        }
        return
    };


    useEffect(() => {
        fetchProduct(entryData?.product);
    }, [entryData?.product])


    return (
        <form onSubmit={sumbitHanlder} className="flex flex-col gap-4 flex-wrap shadow-sm shadow-blue-300 p-4">

            <p className="text-lg text-center text-rose-400">Add items...</p>

            <div className="flex flex-col gap-3 items-start">

                {/* product name */}
                <div className="flex flex-col w-full gap-1 justify-center">
                    <label htmlFor="product">Product</label>
                    <select
                        name="product"
                        required
                        value={entryData.product}
                        onChange={changeHandler}
                        className="p-[6px] px-4 rounded text-black outline-none"
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

                {/* current stock and quantity */}
                <div className="flex gap-10 w-full">

                    <div className="flex flex-col w-full gap-1">
                        <p>Current Stock </p>
                        <p className="rounded p-[6px] px-4 bg-slate-600 text-white">{selectedProduct.currentStock || 0}</p>
                    </div>

                    <div className="flex flex-col w-full gap-1 justify-center">
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

                </div>



                {/* Height , width and area if unit is not piece */}
                {
                    selectedProduct?.unit !== "piece" &&
                    <div className="flex gap-12 w-full">

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="height">Height  </label>
                            <input
                                type="number"
                                name="height"
                                required
                                value={entryData.height}
                                onChange={changeHandler}
                                className="p-1 rounded text-black outline-none"
                            />

                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="width">Width</label>
                            <input
                                type="number"
                                name="width"
                                required
                                value={entryData.width}
                                onChange={changeHandler}
                                className="p-1 rounded text-black outline-none"
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="area">Area :({selectedProduct.unit})</label>
                            <input
                                type="number"
                                name="area"
                                value={entryData?.height * entryData?.width}
                                readOnly
                                className="p-1 rounded text-black outline-none"
                            />
                        </div>


                    </div>
                }

                {
                    (selectedProduct.currentStock - entryData.quantity < 0) && isSellOrder ? (
                        <p className="rounded p-2 px-6 text-rose-600">Not enough stock</p>
                    ) : (
                        <button className="rounded mt-2 p-2 px-6 bg-slate-600">Add</button>
                    )

                }



            </div>



        </form>
    )
}