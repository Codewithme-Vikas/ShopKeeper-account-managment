import { useContext, useEffect, useState } from "react";

import { UserContext } from '../../context/userContext'
import { getOrder } from '../../services/operations/order'
import { useNavigate } from "react-router-dom";

import { generateWhatsAppMessage } from "../../utils/generateWhatshappMessage";

export default function OrderDetail({ id }) {

    const navigate = useNavigate();

    const { userInfo } = useContext(UserContext);
    const [order, setOrder] = useState('');
    const [ message , setMessage ] = useState("");


    const printHanlder = () => {
        window.print();
    };




    async function fetchOrder(id) {
        const orderData = await getOrder(id);
        if (orderData) {
            setOrder(orderData);
            const generatedMsg = await generateWhatsAppMessage(orderData)
            setMessage( generatedMsg );
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
                    className="rounded p-2 px-4 bg-rose-500 "
                >
                    Print
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="rounded p-2 px-4 bg-blue-500 "
                >
                    Go back
                </button>


                {/* send order message to the customer */}
                <a  href={`https://wa.me/91${order.customer?.phone}?text=${ message }`}
                    target="_blank"
                    className="p-2 bg-green-600 rounded hover:bg-green-700 active:bg-green-800"
                >
                    Send to whatshapp
                </a >


            </div>


            <div className="print-section max-w-xl mx-auto mt-8 p-4 border shadow-md">
                <div className="text-3xl font-bold mb-4">{userInfo?.name || "MetaStar Printers "}</div>

                <div className="flex justify-between mb-4">
                    <div>
                        <div>Sold To: {order.customer?.name}</div>
                        <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                        <div>Invoice No: {order.invoiceNo}</div>
                    </div>
                    <div className="text-right">
                        <div>Final Price: Rs.{order.orderPrice}</div>
                    </div>
                </div>

                <table className="w-full border-collapse border border-gray-800 mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-800 py-2 px-4">S.No.</th>
                            <th className="border border-gray-800 py-2 px-4">Name</th>
                            <th className="border border-gray-800 py-2 px-4">Qty</th>
                            <th className="border border-gray-800 py-2 px-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products?.map((ele, index) => (
                            <tr key={ele._id}>
                                <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                <td className="border border-gray-800 py-2 px-4">{ele.productName}</td>
                                <td className="border border-gray-800 py-2 px-4">{ele.quantity}</td>
                                <td className="border border-gray-800 py-2 px-4">${ele.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right font-bold">Final Price: Rs.{order.orderPrice}</div>
            </div>


        </div>
    )
}