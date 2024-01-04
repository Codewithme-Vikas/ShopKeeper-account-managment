import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import CreateOrderForm from "./createOrderForm";
import SelectProduct from "./SelectProduct";

import { getAllCustomer } from "../../services/operations/customer";
import { getAllProducts } from "../../services/operations/product";
import { getAllOrders} from "../../services/operations/order";

import { BACKEND_URL } from "../../data/backendUrl";


export default function CreateOrder() {

    const navigate = useNavigate();

    const [isSellOrder, setIsSellOrder] = useState(true);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);


    const [optionCustomers, setOptionCustomers] = useState([]);
    // const [optionProducts, setOptionProducts] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0)
    const [ invoiceNo , setInvoiceNo ] = useState(0);

    const [orderData, setOrderData] = useState({
        customerId: "", discount: 0, invoiceNo: "", enterPrice: "",
        gst1: "", gst2: "", gst1Rate: 0, gst2Rate: 0, note : ""
    });



    const filteredProducts = products
        .filter(product => selectedProducts.some(selectedProduct => selectedProduct.product === product._id))
        .map(product => {
            const selectedProduct = selectedProducts.find(selectedProduct => selectedProduct.product === product._id);
            return {
                ...product,
                price : selectedProduct.price,
                quantity: selectedProduct.quantity,
                height: selectedProduct.height,
                width: selectedProduct.width,
                area: selectedProduct.width * selectedProduct.height,
            };
        })

    async function submitHandler(e) {
        e.preventDefault();

        try {
            console.log( finalPrice , "finalprice ")
            if (!selectedProducts.length) {
                toast.error("Select at least one product");
                return;
            }
            orderData["products"] = selectedProducts;
            orderData["type"] = isSellOrder ? "Sell" : "Buy";
            orderData["orderPrice"] = finalPrice;
            orderData["invoiceNo"] = invoiceNo;
            orderData["GST"] = {
                GST1: { name: orderData.gst1, rate: orderData.gst1Rate },
                GST2: { name: orderData.gst2, rate: orderData.gst2Rate },
            }
            const response = await fetch(`${BACKEND_URL}/order/create`, {
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
        const noOfOrders = await getAllOrders();
        if (customersData) {
            setCustomers(customersData)
        }
        if (productsData) {
            setProducts(productsData)
        }
        if( noOfOrders ){
            setInvoiceNo( noOfOrders );
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
        let totalPrice = 0;

        filteredProducts.forEach(product => {
            totalPrice += Number(product.price);
        });

        setTotalPrice(totalPrice);
        setFinalPrice(totalPrice)
    }, [filteredProducts]);

    useEffect(() => {
        const finalGSTRate = Number(orderData.gst1Rate) + Number(orderData.gst2Rate);

        const discountedPrice = totalPrice - orderData.discount;
        const finalGST = discountedPrice * finalGSTRate / 100;

        setFinalPrice(discountedPrice + finalGST )
    }, [orderData.gst1Rate, orderData.gst2Rate, orderData.discount]);


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
                        disabled:opacity-50 disabled:cursor-not-allowed z-[-1]"
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


            <div className="max-w-4xl m-auto flex flex-col gap-8 p-8 mb-6 shadow-md shadow-slate-500">

                <p className="text-xl text-rose-500">
                    {`Add new ${isSellOrder ? "Sell" : "Buy"} order...`}
                </p>

                <div className=" gap-4">
                    
                    {/* form */}
                    <div className="flex-[50%]">
                        <SelectProduct
                            products={products}
                            setSelectedProducts={setSelectedProducts}
                        />


                        <CreateOrderForm
                            totalPrice={totalPrice}
                            finalPrice={finalPrice}
                            optionCustomers={optionCustomers}
                            orderData={orderData}
                            setOrderData={setOrderData}
                            submitHandler={submitHandler}
                            invoiceNo = { invoiceNo }
                            setInvoiceNo = { setInvoiceNo }
                        />

                    </div>



                    {/* table of products */}
                    <div className="flex-[50%] mt-4">

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
                                                <th className="py-2 px-4 border-b">Unit</th>
                                                <th className="py-2 px-4 border-b">Height</th>
                                                <th className="py-2 px-4 border-b">Width</th>
                                                <th className="py-2 px-4 border-b">Quantity</th>
                                                <th className="py-2 px-4 border-b">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredProducts.map((product, index) => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td className="py-2 px-4 border-b">{index + 1}</td>
                                                            <td className="py-2 px-4 border-b">{product.productName}</td>
                                                            <td className="py-2 px-4 border-b">{product.unit}</td>
                                                            <td className="py-2 px-4 border-b">
                                                                {
                                                                    product.height ? product.height : "___"
                                                                }
                                                            </td>
                                                            <td className="py-2 px-4 border-b">
                                                                {
                                                                    product.width ? product.width : "___"
                                                                }
                                                            </td>
                                                            <td className="py-2 px-4 border-b">{product.quantity}</td>
                                                            <td className="py-2 px-4 border-b">
                                                                {
                                                                    // product.area ? (product.area * product.quantity * product.price) : (product.quantity * product.price)
                                                                    product.price
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

                    </div>


                </div>

            </div >
        </div >
    )
}