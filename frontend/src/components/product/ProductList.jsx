import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import { getAllProducts } from "../../services/operations/product"


export default function CustomerList() {

    const [ products , setProducts ] = useState( [] );

    async function fetchAllProducts(){
        const productsData = await getAllProducts();
        if( productsData ){
            setProducts( productsData );
        }
        return;
    }

    async function deleteProduct( id ){

        try {
            const response = await fetch( "http://localhost:3000/api/v1/product/delete",{
                method : 'POST',
                body : JSON.stringify( { id } ),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials : "include"
            });

            const data = await response.json();
            if( data.success ){
                getAllProducts(); // reFetch the products
                toast.success("Product is successfully delete!");
                return true;
            }else{
                toast.error("Failed to delete product!");
                return false;
            }

        } catch (error) {
            console.log( error , "Delete product handler");
            return null;
        }
    }

    useEffect( ()=>{
        fetchAllProducts();
    },[]);

    return (
        <div>

            <p className="text-rose-600 text-lg">Product List</p>

            <div>
                <table className="min-w-full  border border-gray-300 text-left overflow-x-auto">

                    <thead className="bg-slate-800">
                        <tr>
                            <th className="py-2 px-4 border-b">S.No.</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b flex gap-4 items-center">
                                <p className="px-2 py-1 ">Action</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{index+1}</td>
                                        <td className="py-2 px-4 border-b">{product.productName}</td>
                                        <td className="py-2 px-4 border-b">{product.price}</td>
                                        <td className="py-2 px-4 border-b flex gap-4 items-center">
                                            <Link to={`/product/update/${product._id}`} 
                                                className="bg-blue-500 text-white px-2 py-1 rounded">
                                                <CiEdit/>
                                            </Link>
                                            <button 
                                                onClick={ ()=> deleteProduct( product._id ) }
                                                className="bg-red-500 text-white px-2 py-1 rounded">
                                                <FaTrashAlt/>
                                            </button>
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