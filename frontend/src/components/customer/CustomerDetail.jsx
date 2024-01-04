import { useEffect, useState } from "react"
import { getCustomer } from "../../services/operations/customer"
import { Link, useNavigate } from "react-router-dom";

export default function CustomerDetail({ id }) {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState("");
    const [customerCredit, setCustomerCredit] = useState(0);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)
    
    console.log( customer , "customer data ")
    
    async function fetchCustomer(customerId) {
        const customer = await getCustomer(customerId)
        if (customer) {
            setCustomer(customer)
        }
        return;
    }

    async function setData() {
        const totalPayment = (customer?.payments)?.reduce((total, payment) => total + payment.amount, 0);
        const totalOrderPrice = (customer?.orders)?.reduce((total, order) => total + order.orderPrice, 0);
        setTotalOrderPrice(totalOrderPrice);
        setTotalPayment(totalPayment);
        setCustomerCredit(totalOrderPrice - totalPayment);
    }


    useEffect(() => {
        fetchCustomer(id);
    }, []);

    useEffect(() => {
        setData();
    }, [customer]);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 border shadow-md flex flex-col gap-3 ">
            <h1 className="text-2xl text-rose-600 mb-4">Customer Details:</h1>


            <div className="flex flex-wrap gap-x-10 gap-y-2">

                <div className="flex gap-2">
                    <p className="font-bold">Name:</p>
                    <p>{customer.name}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">Name:</p>
                    <p className="italic">{customer.accountType}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">Email:</p>
                    <p>{customer.email}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">GST Number:</p>
                    <p>{customer.GSTNumber}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">PAN:</p>
                    <p>{customer.PAN}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">State:</p>
                    <p>{customer?.address?.state}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">District:</p>
                    <p>{customer.address?.district}</p>
                </div>

                <div className="flex gap-2">
                    <p className="font-bold">City:</p>
                    <p>{customer.address?.city}</p>
                </div>
            </div>




            <div className="w-1/2">
                <p className="text-lg font-bold">Accounting:</p>

                <p>Credit: Rs.
                    {
                        (customer.accountType === "Buyer" && customerCredit > 0 ) && <span className="text-red-500"> {customerCredit}</span>
                    }
                    {
                        customer.accountType === "Buyer" && customerCredit < 0 && <span className="text-green-500"> {Math.abs(customerCredit)}</span>
                    }
                    {
                        customer.accountType === "Seller" && customerCredit < 0 && <span className="text-red-500"> {Math.abs(customerCredit)}</span>
                    }
                    {
                        customer.accountType === "Seller" && customerCredit > 0 && <span className="text-green-500"> {customerCredit}</span>
                    }
                </p>
                <p>Total Order: Rs. {totalOrderPrice}</p>
                <p>Total Payment: Rs. {totalPayment}</p>
            </div>


            <div className="flex gap-6">

                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">Payment History:</p>
                    <table className="w-full border-collapse border border-gray-800 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 py-2 px-4">S.No.</th>
                                <th className="border border-gray-800 py-2 px-4">Amount</th>
                                <th className="border border-gray-800 py-2 px-4">Date</th>
                                <th className="border border-gray-800 py-2 px-4">Note</th>

                            </tr>
                        </thead>
                        <tbody>
                            {customer?.payments?.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                    <td className="border border-gray-800 py-2 px-4">Rs. {payment.amount}</td>
                                    {/* <td className="border border-gray-800 py-2 px-4">{new Date(payment.createdAt).toLocaleDateString()}</td> */}
                                    <td className="border border-gray-800 py-2 px-4">{new Date(payment.createdAt).getDay()}/{new Date(payment.createdAt).getMonth() + 1}/{new Date(payment.createdAt).getFullYear()}</td>

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



                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">Order History:</p>
                    <table className="w-full border-collapse border border-gray-800 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 py-2 px-4">S.No.</th>
                                <th className="border border-gray-800 py-2 px-4">Invoice No.</th>
                                <th className="border border-gray-800 py-2 px-4">Order Price</th>
                                <th className="border border-gray-800 py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer?.orders?.map((order, index) => (
                                <tr key={order._id}>
                                    <td className="border border-gray-800 py-2 px-4">{index + 1}</td>
                                    <td className="border border-gray-800 py-2 px-4">
                                        <Link to={`/order/detail/${order._id}`} className="hover:underline">{order.invoiceNo}</Link>
                                    </td>
                                    <td className="border border-gray-800 py-2 px-4">Rs. {order.orderPrice}</td>
                                    {/* <td className="border border-gray-800 py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td> */}
                                    <td className="border border-gray-800 py-2 px-4">{new Date(order.createdAt).getDay()}/{new Date(order.createdAt).getMonth() + 1}/{new Date(order.createdAt).getFullYear()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-fit bg-blue-800 p-2 px-6 rounded text-white outline-none hover:bg-blue-700"
            >
                Go back
            </button>
        </div>


    )
};