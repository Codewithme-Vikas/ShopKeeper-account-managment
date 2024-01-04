import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


import { getAllSellOrders, getAllBuyOrders } from "../../services/operations/order";

export default function OrderList() {


    const [isBuyOrderList, setBuyOrderList] = useState(false);
    const [allSellOrders, setAllSellOrders] = useState([])
    const [allBuyOrders, setAllBuyOrders] = useState([])


    async function fetchAllSellandBuyOrders() {
        const sellOrders = await getAllSellOrders();
        const buyOrders = await getAllBuyOrders();
        if (sellOrders) {
            setAllSellOrders(sellOrders)
        }
        if (buyOrders) {
            setAllBuyOrders(buyOrders);
        }
        return;
    }


    useEffect(() => {
        fetchAllSellandBuyOrders();
    }, []);

    return (
        <div>

            <div className="flex gap-6 mb-6">
                <button onClick={() => setBuyOrderList(false)} className="rounded p-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">Sell Orders List</button>
                <button onClick={() => setBuyOrderList(true)} className="rounded p-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white">Buy Orders List</button>
            </div>


            <p className="text-rose-600 text-lg my-2">{isBuyOrderList ? "Buy Order List:" : "Sell Order List:"}</p>

            <div>
                <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                    <thead className="bg-slate-300">
                        <tr>
                            <th className="py-2 px-4 border-b">S.No.</th>
                            <th className="py-2 px-4 border-b">Invoice No.</th>
                            <th className="py-2 px-4 border-b">Customer</th>
                            <th className="py-2 px-4 border-b">Customer address</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">OrderPrice</th>
                            <th className="py-2 px-4 border-b">Products : Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (isBuyOrderList ? allBuyOrders : allSellOrders).map((order, index) => {
                                return (
                                    <tr key={order._id}>
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">
                                            <Link to={`/order/detail/${order._id}`} className="hover:underline"
                                            >
                                                {order?.invoiceNo}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-4 border-b">{order?.customer.name}</td>
                                        <td className="py-2 px-4 border-b">{order?.customer.address?.state}</td>
                                        {/* <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td> */}
                                        <td className="py-2 px-4 border-b">{new Date(order.createdAt).getDay()}/{new Date(order.createdAt).getMonth() + 1}/{new Date(order.createdAt).getFullYear()}</td>
                                        <td className="py-2 px-4 border-b">{order?.orderPrice}</td>
                                        <td className="py-2 px-4 border-b">
                                            {
                                                order?.products.map((ele) => (
                                                    <p key={ele._id}>{ele.productName} : {ele.quantity}</p>
                                                ))
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
    )
}