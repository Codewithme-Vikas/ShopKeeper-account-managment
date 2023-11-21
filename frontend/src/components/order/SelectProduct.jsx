import { useEffect, useState } from "react";
import { getProduct } from "../../services/operations/product";

export default function SelectProduct({ isSellOrder, products, setSelectedProducts }) {

    const [selectedProduct, setSelectedProduct] = useState("");

    const [entryData, setEntryData] = useState({
        product: "", quantity: 0, height: "", width: "",
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
        <form onSubmit={sumbitHanlder} className="flex gap-6 flex-wrap shadow-sm shadow-blue-100 p-2 pb-4">

            <div className="flex gap-2 items-center justify-center">
                <label htmlFor="product">Product</label>
                <select
                    name="product"
                    required
                    value={entryData.product}
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


            <div className="flex gap-2 items-center">
                <p>Current Stock : </p>
                <p className="rounded p-2 px-4 bg-slate-600 text-white">{selectedProduct.currentStock || 0}</p>
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


            {
                selectedProduct?.unit !== "piece" &&
                <div className="flex gap-6">

                    <div className="flex gap-2 items-center justify-center">
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

                    <div className="flex gap-2 items-center justify-center">
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

                    <div className="flex gap-2 items-center justify-center">
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
                        <button className="rounded p-2 px-6 bg-slate-600">Add</button>
                )
                
            }

        </form>
    )
}