import { useEffect, useState } from "react"


import { getAllPayments } from "../services/operations/payments"
import { Link } from "react-router-dom";
import FilterItems from "./FilterItems";

export default function PaymentList() {

    const [payments, setPayments] = useState([]);
    const [filterPayments, setFilterPayments] = useState([]);

    const [searchKey, setSearchKey] = useState("");


    async function fetchAllPayments() {
        const paymentData = await getAllPayments();
        if (paymentData) {
            setPayments(paymentData);
            setFilterPayments(paymentData);
        }
        return;
    }

    async function filterItems() {
        const filterItems = payments.filter(item => (
            item.createdAt.includes( searchKey )
        ));
        setFilterPayments( filterItems );
    }

    useEffect(() => {
        fetchAllPayments();
    }, []);

    return (
        <div className="flex flex-col gap-8">

            <p className="text-rose-600 text-xl">Payment List</p>


            <div>

                <div className="flex w-[50%] flex-col gap-1">
                    <label htmlFor="searchKey" >Date</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            name="searchKey"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            required
                            className="p-[6px] rounded text-black outline-none"
                            placeholder="Enter date"
                        />
                        <button
                            type="button"
                            onClick={filterItems}
                            className="bg-blue-700 active:bg-blue-600 p-2 px-6 rounded outline-none hover:bg-blue-500 text-white"
                        >
                            Search
                        </button>
                    </div>
                </div>

            </div>


            <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">Payment History:</p>
                <table className="w-full border-collapse border border-gray-800 mb-4 mt-2 rounded">
                    <thead className="bg-slate-300">
                        <tr>
                            <th className="border border-gray-800 py-2 px-4">S.No.</th>
                            <th className="border border-gray-800 py-2 px-4">Customer</th>
                            <th className="border border-gray-800 py-2 px-4">Amount</th>
                            <th className="border border-gray-800 py-2 px-4">Date</th>
                            <th className="border border-gray-800 py-2 px-4">Note</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filterPayments?.map((payment, index) => (
                            <tr key={payment._id}>
                                <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                <td className="border border-gray-800 py-2 px-4 hover:underline">
                                    <Link to={`/customer/detail/${payment.customer}`} >
                                        {payment.customer?.name}
                                    </Link>

                                </td>
                                <td className="border border-gray-800 py-2 px-4">Rs. {payment.amount}</td>
                                <td className="border border-gray-800 py-2 px-4">{new Date(payment.createdAt).getDay() }/{new Date(payment.createdAt).getMonth() + 1}/{new Date(payment.createdAt).getFullYear()}</td>
                                <td className="border border-gray-800 py-2 px-4">
                                    {
                                        payment?.note ? (payment?.note) : "__"
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}