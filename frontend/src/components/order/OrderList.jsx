import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


import { CiEdit } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";

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
                <button onClick={() => setBuyOrderList(false)} className="rounded p-2 px-4 bg-blue-500 hover:bg-blue-700">Sell Orders List</button>
                <button onClick={() => setBuyOrderList(true)} className="rounded p-2 px-4 bg-yellow-500 hover:bg-yellow-700">Buy Orders List</button>
            </div>


            <p className="text-rose-600 text-lg my-2">{ isBuyOrderList ? "Buy Order List:" : "Sell Order List:"}</p>

            <div>
                <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                    <thead className="bg-slate-800">
                        <tr>
                            <th className="py-2 px-4 border-b">S.No.</th>
                            <th className="py-2 px-4 border-b">Customer</th>
                            <th className="py-2 px-4 border-b">Customer address</th>
                            <th className="py-2 px-4 border-b">createdAt</th>
                            <th className="py-2 px-4 border-b">OrderPrice</th>
                            <th className="py-2 px-4 border-b">Products : Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ( isBuyOrderList ? allBuyOrders : allSellOrders ).map((order, index) => {
                                return (
                                    <tr key={order._id}>
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{order?.customer.name}</td>
                                        <td className="py-2 px-4 border-b">{order?.customer.address?.state}</td>
                                        <td className="py-2 px-4 border-b">{order?.createdAt}</td>
                                        <td className="py-2 px-4 border-b">{order?.orderPrice}</td>
                                        <td className="py-2 px-4 border-b">
                                        {
                                            order?.products.map( (ele)=>(
                                                <p key={ele._id }>{ ele.product?.productName} : {ele.quantity}</p>
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