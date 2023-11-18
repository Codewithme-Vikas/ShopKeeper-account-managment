import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


import { CiEdit } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";

import { getAllCustomer } from "../../services/operations/customer";

export default function CustomerList() {

    const [ customers , setCustomers ] = useState( [] );


    async function fetchAllCustomer(){
        const customersData = await getAllCustomer();
        if( customersData ){
            setCustomers(customersData)
        }
        return;
    }

    useEffect( ()=>{
        fetchAllCustomer();
    },[]);
    
    return (
        <div>

            <p className="text-rose-600 text-lg">Customer List</p>

            <div>
                <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                    <thead className="bg-slate-800">
                        <tr>
                            <th className="py-2 px-4 border-b">S.No.</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Type</th>
                            {/* <th className="py-2 px-4 border-b">Credit</th> */}
                            <th className="py-2 px-4 border-b flex gap-4 items-center">
                                <p className="px-2 py-1 ">Action</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((customer, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{index+1}</td>
                                        <td className="py-2 px-4 border-b">{customer.name}</td>
                                        <td className="py-2 px-4 border-b">{customer.email}</td>
                                        <td className="py-2 px-4 border-b">{customer.phone}</td>
                                        <td className="py-2 px-4 border-b">

                                            { customer?.address?.city ? `${customer.address.city}, ` : ""}
                                            { customer?.address?.district ? `${customer.address.district}, `: ""}
                                            { customer?.address?.state ?? ""}
                                            
                                        </td>
                                        <td className="py-2 px-4 border-b">{customer.accountType}</td>
                                        <td className="py-2 px-4 border-b flex gap-4 items-center">
                                            <Link 
                                                to={`/customer/update/${customer._id}`}
                                                className="bg-blue-500 text-white px-2 py-1 rounded">
                                                <CiEdit/>
                                            </Link>
                                            <Link 
                                                to={`/customer/detail/${customer._id}`}
                                                className="bg-red-500 text-white px-2 py-1 rounded">
                                                <BiSolidUserDetail/>
                                            </Link>
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