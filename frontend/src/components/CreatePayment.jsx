import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllCustomer } from "../services/operations/customer";
import { BACKEND_URL } from "../data/backendUrl";

export default function CreatePayment() {

    const [customers, setCustomers] = useState([]);

    const [customerId, setCustomerId] = useState("");
    const [ note , setNote ] = useState("");
    const [amount, setAmount] = useState(0);

    async function fetchAllCustomers() {
        const customersData = await getAllCustomer();
        if (customersData) {
            setCustomers(customersData)
        }
        return;
    }

    async function paymentHandler(e) {
        e.preventDefault();

        try {
            if( amount <= 0){
                toast.error("Enter valid amount");
                return;
            }
            console.log( note , "note")
            const response = await fetch(`${BACKEND_URL}/order/payment`, {
                method: 'POST',
                body: JSON.stringify({customerId,amount,note}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            const data = await response.json();
            if (data.success) {
                toast.success("Payment successfully!");
                setAmount(0)
                setCustomerId("")
                return true;
            } else {
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error, "payment  handler");
            return null;
        }
    }

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    return (
        <div className="gap-6" >

            <form onSubmit={ paymentHandler } className="max-w-2xl m-auto flex flex-col p-4 mt-12 gap-6 shadow-md shadow-slate-500">

                <p className="text-rose-500 text-center text-lg">Let's do Payment...</p>


                {/* customer name  */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="customerId" className="after:content-['*'] after:ml-0.5 after:text-red-500">Customer</label>
                    <select
                        name="customerId"
                        required
                        className="p-[6px] px-4 rounded text-black outline-none"
                        onChange={e => setCustomerId(e.target.value)}
                        value={customerId}
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

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="amount" className="after:content-['*'] after:ml-0.5 after:text-red-500">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        required
                        className="p-[6px] px-4 rounded text-black outline-none"
                        onChange={e => setAmount(e.target.value)}
                        value={amount}
                    />

                </div>


                <div className=" flex flex-col w-full gap-1">

                        <label htmlFor="note">Note :</label>
                        <textarea
                            name="note"
                            id="note"
                            onChange={e => setNote(e.target.value)}
                            value={note}
                            cols="30"
                            rows="3"
                            className="p-[6px] rounded text-black outline-none "
                            placeholder="Enter any additional message..."
                        >
                        </textarea>
                       
                    </div>


                

                <div className="flex gap-6">
                    <button className="bg-blue-700 p-2 px-6 rounded outline-none text-white hover:bg-blue-600">Pay</button>
                </div>



            </form>
        </div>
    )
}