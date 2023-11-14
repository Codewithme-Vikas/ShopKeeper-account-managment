import { Link , useParams } from 'react-router-dom'
import CreateCustomer from '../components/customer/CreateCustomer'
import CustomerList from '../components/customer/CustomerList'

export default function CustomerPage() {

    const params = useParams();

    return (
        <div className='mx-auto flex justify-center overflow-hidden'>

            <div className='flex-[13%] pt-6 bg-slate-700 min-h-screen'>
                <ul className='flex flex-col gap-4  px-4'>
                    <Link to="/customer/read">Customer List</Link>
                    <Link to="/customer/add" >Add Customer</Link>
                </ul>
            </div>

            <div className='w-full m-2 mt-6'>

                { params.op === "add" && <CreateCustomer /> }
                
                {
                    params.op === "read" && <CustomerList />
                }
                

            </div>

        </div>
    )
};