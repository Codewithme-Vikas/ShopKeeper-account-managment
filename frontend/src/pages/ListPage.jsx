import { Link, useLocation, useParams } from 'react-router-dom'

import CustomerList from '../components/customer/CustomerList';
import UpdateCustomer from '../components/customer/UpdateCustomer';
import CustomerDetail from '../components/customer/CustomerDetail';

import ProductList from '../components/product/ProductList'
import UpdateProduct from '../components/product/UpdateProduct';

import OrderList from '../components/order/OrderList';


export default function ListPage() {

    const location = useLocation();
    const urlPath = location.pathname;
    const params = useParams();

    return (
        <div className='mx-auto flex justify-center overflow-hidden'>

            <div className='flex-[13%] pt-6 bg-slate-700 min-h-screen'>
                <ul className='flex flex-col gap-4  px-4'>
                    <Link to="/list/customer">Customer List</Link>
                    <Link to="/list/product" >Product List</Link>
                    <Link to="/list/order" >Order List</Link>
                </ul>
            </div>

            <div className='w-full m-2 mt-6'>

                {
                    params.type === "order" && <OrderList />
                }

                {
                    params.type === "product" && <ProductList />
                }

                {
                    params.type === "customer" && <CustomerList />
                }

                {
                    urlPath.includes("customer") && urlPath.includes("update") && params?.id && <UpdateCustomer id={params.id} />
                }

                {
                    urlPath.includes("customer") && urlPath.includes("detail") && params?.id && <CustomerDetail id={params.id} />
                }

                {
                    urlPath.includes("product") && urlPath.includes("update") && params?.id && <UpdateProduct id={params.id} />
                }


            </div>

        </div>
    )
};