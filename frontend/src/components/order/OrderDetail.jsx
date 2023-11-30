import { useContext, useEffect, useState } from "react";

import { UserContext } from '../../context/userContext'
import { getOrder } from '../../services/operations/order'
import { useNavigate } from "react-router-dom";


export default function OrderDetail({ id }) {

    const navigate = useNavigate();
    const [order, setOrder] = useState('');
    const { userInfo } = useContext(UserContext);


    const printHanlder = () => {
        window.print();
    };



    async function fetchOrder(id) {
        const orderData = await getOrder(id);
        if (orderData) {
            setOrder(orderData);
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


            </div>


            <div className="print-section max-w-xl mx-auto mt-8 p-4 border shadow-md">
                <div className="text-3xl font-bold mb-4">{userInfo?.name || "MetaStar Printers "}</div>

                <div className="flex justify-between mb-4">
                    <div>
                        <div>Sold To: {order.customer?.name}</div>
                        <div>Date: {new Date(order.date).toLocaleDateString()}</div>
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
                            <th className="border border-gray-800 py-2 px-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products?.map((ele, index) => (
                            <tr key={ele._id}>
                                <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                <td className="border border-gray-800 py-2 px-4">{ele.product?.productName}</td>
                                <td className="border border-gray-800 py-2 px-4">{ele.quantity}</td>
                                <td className="border border-gray-800 py-2 px-4">${ele.product?.price}</td>
                                <td className="border border-gray-800 py-2 px-4">${ele.product?.price * ele.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right font-bold">Final Price: Rs.{order.orderPrice}</div>
            </div>


        </div>
    )
}