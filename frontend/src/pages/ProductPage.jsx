import { useParams , Link, Outlet } from 'react-router-dom'

import CreateProduct from '../components/product/CreateProduct';
import UpdateProduct from '../components/product/UpdateProduct';
import ProductList from '../components/product/ProductList';

export default function ProductPage(){

    const params = useParams();
    
    return (
        <div className='mx-auto flex justify-center overflow-hidden'>

            <div className='flex-[13%] pt-6 bg-slate-700 min-h-screen'>
                <ul className='flex flex-col gap-4  px-4'>
                    <Link to="/product/read">Product List</Link>
                    <Link to="/product/add" >Add Product</Link>
                </ul>
            </div>

            <div className='w-full m-2 mt-6'>

                { params.op === "add" && <CreateProduct /> }
                
                {
                    params.op === "read" && <ProductList />
                }
                
                {
                    params?.id  && <UpdateProduct id={params.id} />
                }
            </div>


                <Outlet/>
        </div>
    )
};