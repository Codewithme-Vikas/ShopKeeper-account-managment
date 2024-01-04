import { useEffect, useState } from "react";

import { getOrder } from '../../services/operations/order'
import { useNavigate } from "react-router-dom";

import { generateWhatsAppMessage } from "../../utils/generateWhatshappMessage";
import logo from "../../assets/image/logo.png"

export default function OrderDetail({ id }) {

    const navigate = useNavigate();

    const [order, setOrder] = useState('');
    const [message, setMessage] = useState("");


    const printHanlder = () => {
        window.print();
    };




    async function fetchOrder(id) {
        const orderData = await getOrder(id);
        if (orderData) {
            setOrder(orderData);
            const generatedMsg = await generateWhatsAppMessage(orderData)
            setMessage(generatedMsg);
        }
    }

    useEffect(() => {
        fetchOrder(id);
    }, []);


    return (
        <div>

            <div className="flex gap-6">
                <button
                    onClick={printHanlder}
                    className="rounded p-2 px-4 bg-rose-700 hover:bg-rose-500 text-white"
                >
                    Print
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="rounded p-2 px-4 bg-blue-700 hover:bg-blue-500 text-white"
                >
                    Go back
                </button>


                {/* send order message to the customer */}
                <a href={`https://wa.me/91${order.customer?.phone}?text=${message}`}
                    target="_blank"
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800"
                >
                    Send to whatshapp
                </a >


            </div>


            <div className="print-section max-w-xl mx-auto mt-8 p-5 border rounded shadow-md">


                <div className="text-3xl font-bold mb-6 mt-2 flex justify-center items-center">
                    <img src={logo} alt="Ritik Advertising" className="w-[160px]" />
                </div>

                <div className="flex justify-between mb-4">

                    <div className="flex flex-col gap-1">

                        <div>
                            {order.type === "Sell" ? "Sold To" : "Buy From"} :
                            <span className="text-lg font-semibold mx-1"> {order.customer?.name}</span>
                        </div>

                        {/* <div>Date : {new Date(order.createdAt).toLocaleDateString()}</div> */}
                        <div>Date : {new Date(order.createdAt).getDay()}/{new Date(order.createdAt).getMonth() + 1}/{new Date(order.createdAt).getFullYear()}</div>

                        <div>Invoice No : {order.invoiceNo}</div>
                    </div>


                    <div className="text-right">
                        {
                            order.GST?.GST1?.rate + order.GST?.GST2?.rate > 0 && <div>GST : {order.GST?.GST1?.rate + order.GST?.GST2?.rate}{"%"}</div>
                        }

                    </div>

                </div>

                {/* table */}
                <table className="w-full border-collapse border border-gray-800 mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-800 py-2 px-4">S.No.</th>
                            <th className="border border-gray-800 py-2 px-4">Name</th>
                            <th className="border border-gray-800 py-2 px-4">Height</th>
                            <th className="border border-gray-800 py-2 px-4">Width</th>
                            <th className="border border-gray-800 py-2 px-4">Qty</th>
                            <th className="border border-gray-800 py-2 px-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products?.map((ele, index) => (
                            <tr key={ele._id}>
                                <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                <td className="border border-gray-800 py-2 px-4">{ele.productName}</td>
                                <td className="border border-gray-800 py-2 px-4">
                                    {
                                        ele.height ? ele.height : "___"
                                    }
                                </td>
                                <td className="border border-gray-800 py-2 px-4">
                                    {
                                        ele.width ? ele.width : "___"
                                    }
                                </td>
                                <td className="border border-gray-800 py-2 px-4">{ele.quantity}</td>
                                <td className="border border-gray-800 py-2 px-4">&#8377; {ele.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* total price , discount and final price */}
                <div className="flex flex-col gap-1">
                    <div className="text-right">Total Price : &#8377; {order.orderPrice - order.discount}</div>
                    <div className="text-right">Discount : &#8377; {order.discount}</div>
                    <div className="text-right">
                        Final Price <span className="text-sm">( GST included ) </span> :  <span className="font-semibold text-lg">&#8377; {order.orderPrice}</span>
                    </div>
                </div>


                {
                    order.note && <p className="mt-2">Note : {order.note}</p>
                }

            </div>


        </div>
    )
}