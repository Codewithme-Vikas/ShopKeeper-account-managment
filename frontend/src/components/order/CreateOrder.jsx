import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import CreateOrderForm from "./createOrderForm";

import { getAllCustomer } from "../../services/operations/customer";
import { getAllProducts } from "../../services/operations/product";

import SelectProduct from "./SelectProduct";
import { useNavigate } from "react-router-dom";



export default function CreateOrder() {

    const navigate = useNavigate();

    const [isSellOrder, setIsSellOrder] = useState(true);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [optionCustomers, setOptionCustomers] = useState([]);
    const [optionProducts, setOptionProducts] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0)

    const [orderData, setOrderData] = useState({
        customerId: "", discount: 0, invoiceNo: "", date: "", enterPrice: "",
        gst1: "", gst2: "", gst1Rate: 0, gst2Rate: 0
    });



    const filteredProducts = products
        .filter(product => selectedProducts.some(selectedProduct => selectedProduct.product === product._id))
        .map(product => {
            const selectedProduct = selectedProducts.find(selectedProduct => selectedProduct.product === product._id);
            return {
                ...product,
                quantity: selectedProduct.quantity,
                height: selectedProduct.height,
                width: selectedProduct.width,
                area: selectedProduct.width * selectedProduct.height,
            };
        })



    async function submitHandler(e) {
        e.preventDefault();

        try {

            if (!selectedProducts.length) {
                toast.error("Select at least one product");
                return;
            }

            orderData["products"] = selectedProducts;
            orderData["type"] = isSellOrder ? "Sell" : "Buy";
            orderData["orderPrice"] = finalPrice;
            orderData["GST"] = {
                GST1: { name: orderData.gst1, rate: orderData.gst1Rate },
                GST2: { name: orderData.gst2, rate: orderData.gst2Rate },
            }
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
                return navigate(`/order/detail/${data.orderDoc?._id}`);
            } else {
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error, "create order handler");
            return null;
        }
    }




    async function fetchCustomersAndProducts() {
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
        fetchCustomersAndProducts();
    }, []);

    useEffect(() => {
        const customerType = isSellOrder ? "Buyer" : "Seller";
        setOptionCustomers(customers.filter(customer => customer.accountType === customerType));
    }, [isSellOrder, customers])

    useEffect(() => {
        if (!isSellOrder) {
            setOptionProducts(products.filter(product => product.type === "Purchase"));
        } else {
            setOptionProducts(products)
        }
    }, [isSellOrder, products]);

    useEffect(() => {
        let totalPrice = 0;

        filteredProducts.forEach(product => {
            totalPrice += product?.area ? (product.quantity * product.price * product.area) : product.quantity * product.price;
        });

        setTotalPrice(totalPrice);
    }, [filteredProducts]);

    useEffect(() => {
        const finalGSTRate = Number(orderData.gst1Rate) + Number(orderData.gst2Rate);

        const discountedPrice = orderData.enterPrice - orderData.discount;
        const finalPrice = discountedPrice * finalGSTRate / 100;

        setFinalPrice(discountedPrice + finalPrice)
    }, [orderData.gst1Rate, orderData.gst2Rate, orderData.enterPrice, orderData.discount]);


    return (

        <div className="flex flex-col gap-8">

            {/* buy and sell button */}
            <div className="flex gap-6">
                <p className="text-lg italic text-blue-400">Order Type :</p>

                <button
                    disabled={isSellOrder}
                    onClick={() => {
                        setIsSellOrder(true);
                        setSelectedProducts([])
                    }}
                    className="bg-slate-600 p-2 px-6 rounded outline-none hover:bg-slate-700 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sell
                </button>

                <button
                    disabled={!isSellOrder}
                    onClick={() => {
                        setIsSellOrder(false)
                        setSelectedProducts([])
                    }}
                    className="bg-blue-800 p-2 px-6 rounded outline-none hover:bg-blue-700
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Buy
                </button>

            </div>


            <div className="max-w-5xl m-auto flex flex-col gap-8 p-8 mb-6 shadow-md shadow-slate-500">

                <p className="text-xl text-rose-500">
                    {`Add new ${isSellOrder ? "Sell" : "Buy"} order...`}
                </p>

                <SelectProduct
                    isSellOrder={isSellOrder}
                    products={optionProducts}
                    setSelectedProducts={setSelectedProducts}
                />


                <CreateOrderForm
                    totalPrice={totalPrice}
                    finalPrice={finalPrice}
                    optionCustomers={optionCustomers}
                    orderData={orderData}
                    setOrderData={setOrderData}
                    submitHandler={submitHandler}
                />



                {/* product table  */}

                {
                    filteredProducts.length > 0 &&
                    
                    <div className="flex flex-col gap-4">
                        <p className="text-blue-500 text-lg">Select products :</p>
                        <div>
                            <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                                <thead className="bg-slate-800">
                                    <tr>
                                        <th className="py-2 px-4 border-b">S.No.</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Price (1 unit)</th>
                                        <th className="py-2 px-4 border-b">Unit</th>
                                        <th className="py-2 px-4 border-b">Area</th>
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
                                                    <td className="py-2 px-4 border-b">{product.unit}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {
                                                            product.area ? product.area : "___"
                                                        }
                                                    </td>
                                                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {
                                                            product.area ? (product.area * product.quantity * product.price) : (product.quantity * product.price)
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }



            </div >
        </div >
    )
}