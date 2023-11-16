import { useParams , useLocation , Link } from "react-router-dom";

import CreateOrder from "../components/order/CreateOrder"
import OrderList from "../components/order/OrderList"


export default function OrderPage(){
    const location = useLocation();
    const urlPath = location.pathname;
    const params = useParams();

    return (
        <div className='mx-auto flex justify-center overflow-hidden'>

            <div className='flex-[13%] pt-6 bg-slate-700 min-h-screen'>
                <ul className='flex flex-col gap-4  px-4'>
                    <Link to="/order/read">Order List</Link>
                    <Link to="/order/add" >Add order</Link>
                </ul>
            </div>

            <div className='w-full m-2 mt-6'>

                {params.op === "add" && <CreateOrder />}

                {
                    params.op === "read" && <OrderList />
                }

                {/* {
                    urlPath.includes("update") && params?.id && <UpdateCustomer id={params.id} />
                }

                {
                    urlPath.includes("detail") && params?.id && <CustomerDetail id={params.id} />
                } */}

            </div>

        </div>
    )
};