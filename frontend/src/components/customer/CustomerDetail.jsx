import { useEffect, useState } from "react"
import { getCustomer } from "../../services/operations/customer"
import { useNavigate } from "react-router-dom";

export default function CustomerDetail({ id }) {

    const navigate = useNavigate();
    const [customer, setCustomer] = useState("");
    const [customerCredit , setCustomerCredit ] = useState(0);
    const [ totalOrderPrice , setTotalOrderPrice ] = useState(0)
    const [ totalPayment , setTotalPayment ] = useState(0)

    async function fetchCustomer(customerId) {
        const customer = await getCustomer(customerId)
        if (customer) {
            setCustomer(customer)
        }
        return;
    }

    async function setData(){
        const totalPayment = (customer?.payments)?.reduce((total, payment) => total + payment.amount, 0);
        const totalOrderPrice = (customer?.orders)?.reduce((total, order) => total + order.orderPrice, 0);
        setTotalOrderPrice( totalOrderPrice );
        setTotalPayment( totalPayment );
        setCustomerCredit( totalOrderPrice - totalPayment );
    }
    

    useEffect(() => {
        fetchCustomer(id);
    }, []);

    useEffect( ()=>{
        setData();
    },[customer]);

    return (
        <div>
            <h1 className="text-xl text-rose-600">Customer Details are-!</h1>

            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>GST Number :- {customer.GSTNumber}</p>
            <p>PAN :- {customer.PAN}</p>

            <p>{customer?.address?.state}</p>
            <p>{customer.address?.district}</p>
            <p>{customer.address?.city}</p>
            
            <p>Style this page and show customer orders and payments</p>

            <p className="text-lg py-2">Payment History:-</p>
            {(customer?.payments)?.map(payment => (
                <p key={payment._id}>Rs. {payment.amount} : {payment.createdAt}</p>
            ))}

            <p className="text-lg py-2">Order History:-</p>
            {(customer?.orders)?.map( order => (
                <p key={order._id}>Rs. {order.orderPrice} : {order.createdAt}</p>
            ))}

            <p> Credit : Rs.{customerCredit}</p>
            <p> Order : Rs. {totalOrderPrice}</p>
            <p> payment : Rs. {totalPayment}</p>

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-blue-800 p-2 px-6 rounded outline-none hover:bg-blue-700"
            >
                Go back
            </button>

        </div>
    )
};