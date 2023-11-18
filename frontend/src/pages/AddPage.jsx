import { Link, useLocation, useParams } from 'react-router-dom'

import CreateOrder from '../components/order/CreateOrder';
import CreateProduct from '../components/product/CreateProduct';
import CreateCustomer from '../components/customer/CreateCustomer';

export default function AddPage() {

    const location = useLocation();
    const urlPath = location.pathname;
    const params = useParams();

    return (
        <div className='mx-auto flex justify-center overflow-hidden'>

            <div className='flex-[13%] pt-6 bg-slate-700 min-h-screen'>
                <ul className='flex flex-col gap-4  px-4'>
                    <Link to="/add/customer"> Customer +</Link>
                    <Link to="/add/product" > Product +</Link>
                    <Link to="/add/order" > Order +</Link>
                </ul>
            </div>

            <div className='w-full m-2 mt-6'>

                {
                    params.type === "order" && <CreateOrder />
                }

                {
                    params.type === "product" && <CreateProduct />
                }

                {
                    params.type === "customer" && <CreateCustomer />
                }

            </div>

        </div>
    )
};