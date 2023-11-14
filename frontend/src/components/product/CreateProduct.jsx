import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import toast from "react-hot-toast";

export default function CreateProduct() {

    const navigate = useNavigate();

    const [ productName , setProductName ] = useState("");
    const [ price , setPrice ] = useState(0)

    async function submitHandler(e) {
        e.preventDefault();
        
        try {
            const response = await fetch( `http://localhost:3000/api/v1/product/create`,{
                method : 'POST',
                body : JSON.stringify( {productName , price} ),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : "include"
            })
            
            const data = await response.json();
            if( data.success ){
                setPrice(0);
                setProductName("");
                toast.success("product added successfully!");
                return true;
            }else{
                toast.error("Failed to create toast!")
                return false;
            }
    
        } catch (error) {
            console.log(error , "create product handler");
            return null;
        }
    }


    return (
        <div>

            <p className="text-lg text-rose-500 my-1">Create new customer</p>

            <form onSubmit={ submitHandler   }  className="flex gap-6 flex-wrap items-center my-4 border py-8 px-4">

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={ e => setProductName( e.target.value ) }
                        value={ productName }
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={ e => setPrice( e.target.value ) }
                        value={ price}
                    />
                </div>

                <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Add</button>


            </form>

        </div>
    )
}