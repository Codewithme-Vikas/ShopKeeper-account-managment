import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getAllCustomer } from "../../services/operations/customer";
import { getAllProducts } from "../../services/operations/product";
import SelectProduct from "./SelectProduct";

// To do : Note :- all products array has different formats, selectedProducts will be use for send to backend and filteredProducts will be use for display
export default function CreateOrder() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [orderData, setOrderData] = useState({
        customerId: "", type: "sell", payAmount: 0, discount: 0,
    });
    const [orderPrice, setOrderPrice] = useState(0);


    const filteredProducts = products
        .filter(product => selectedProducts.some(selectedProduct => selectedProduct.id === product._id))
        .map(product => {
            const selectedProduct = selectedProducts.find(selectedProduct => selectedProduct.id === product._id);
            return {
                ...product,
                quantity: selectedProduct.quantity,
            };
        })



    async function submitHandler(e) {
        e.preventDefault();

        try {
            orderData["orderPrice"] = orderPrice;
            orderData["products"] = selectedProducts;

            const response = await fetch(`http://localhost:3000/api/v1/order/create`, {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            const data = await response.json();
            if (data.success) {
                toast.success("Order successfully added!");
                return navigate("/order/read");
            } else {
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error, "create order handler");
            return null;
        }
    }



    function changeHandler(e) {
        setOrderData(prevData => {
            // return the object with previous field(data) and update target field
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }



    async function fetchAllCustomerAndProducts() {
        const customersData = await getAllCustomer();
        const productsData = await getAllProducts();
        if (customersData) {
            setCustomers(customersData)
        }
        if (productsData) {
            setProducts(productsData)
        }
        return;
    }

    useEffect(() => {
        fetchAllCustomerAndProducts();
    }, []);


    useEffect(() => {
        let totalPrice = 0;

        filteredProducts.forEach(product => {
            totalPrice += product.quantity * product.price;
        });

        setOrderPrice(totalPrice);
    }, [filteredProducts]);

    return (
        <div className="border flex flex-col gap-8 p-6 pb-10">

            <p className="text-lg text-rose-500">Add new order...</p>

            <SelectProduct
                products={products}
                setSelectedProducts={setSelectedProducts}
            />



            <form onSubmit={submitHandler} className="flex flex-col gap-6 flex-wrap items-start justify-center">


                <div className="flex items-center gap-6 flex-wrap">


                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="customerId">Customer</label>
                        <select
                            name="customerId"
                            required
                            className="p-2 px-4 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={orderData.customerId}
                        >
                            <option value="" disabled>
                                Choose an customer
                            </option>
                            {
                                customers?.map((customer) => {
                                    return (
                                        <option value={customer._id} key={customer._id}>{customer.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            required
                            className="p-2 px-4 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={orderData.type}
                        >
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>



                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="orderPrice">Price</label>
                        <input
                            type="number"
                            name="orderPrice"
                            required
                            className="p-1 rounded text-black outline-none"
                            value={orderPrice}
                            readOnly
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="payAmount">Payment</label>
                        <input
                            type="number"
                            name="payAmount"
                            className="p-1 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={orderData.payAmount}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="discount">Discount</label>
                        <input
                            type="number"
                            name="discount"
                            className="p-1 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={orderData.discount}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <label htmlFor="discountedPrice">Price after discount</label>
                        <input
                            type="number"
                            name="discountedPrice"
                            className="p-1 rounded text-black outline-none"
                            readOnly
                            value={orderPrice - orderData.discount}
                        />
                    </div>
                </div>

                <div className="flex gap-6">
                    <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Create</button>
                    <button type="button" onClick={() => navigate(-1)} className="bg-blue-800 p-2 px-6 rounded outline-none hover:bg-blue-700">Cancle</button>
                </div>


            </form>



            <div className="flex flex-col gap-4">
                <p className="text-blue-500 text-lg">Select products :</p>
                {
                    selectedProducts.length > 0 &&
                    <div>
                        <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                            <thead className="bg-slate-800">
                                <tr>
                                    <th className="py-2 px-4 border-b">S.No.</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Price</th>
                                    <th className="py-2 px-4 border-b">Quantity</th>
                                    <th className="py-2 px-4 border-b">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredProducts.map((product, index) => {
                                        return (
                                            <tr key={product._id}>
                                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                                <td className="py-2 px-4 border-b">{product.price}</td>
                                                <td className="py-2 px-4 border-b">{product.quantity}</td>
                                                <td className="py-2 px-4 border-b">{product.quantity * product.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>



        </div>
    )
}