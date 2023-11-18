import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import toast from "react-hot-toast";

import { productUnits } from "../../data/productUnits"
export default function CreateProduct() {

    const navigate = useNavigate();

    const [ productName , setProductName ] = useState("");
    const [ price , setPrice ] = useState(0);
    const [ type , setType ] = useState("Manufuture");
    const [ unit , setUnit ] = useState("");
    const [ openingStock , setOpeningStock ] = useState(0);

    async function submitHandler(e) {
        e.preventDefault();
        
        try {
            const productData = {
                productName, price , type , unit , openingStock,
                currentStock : openingStock
            }
            const response = await fetch( `http://localhost:3000/api/v1/product/create`,{
                method : 'POST',
                body : JSON.stringify( productData ),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : "include"
            })
            
            const data = await response.json();
            if( data.success ){
                return navigate("/product/read");
            }else{
                toast.error("Failed to create product!")
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

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="openingStock">Opening Stock</label>
                    <input
                        type="number"
                        name="openingStock"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={ e => setOpeningStock( e.target.value ) }
                        value={ openingStock }
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={ e => setType(e.target.value)}
                        value={ type }
                    >   
                        <option value="Manufuture">Manufuture</option>
                        <option value="Purchase">Purchase</option>
                    </select>
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="unit">Unit</label>
                    <select
                        name="unit"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={ e => setUnit(e.target.value)}
                        value={ unit }
                    >   
                        <option value="" disabled>Choose an option</option>
                        {
                            productUnits.map( (ele , index) => (
                                <option value={ele} key={index}>{ ele }</option>

                            ))
                        }
                    </select>
                </div>

                <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Add</button>


            </form>

        </div>
    )
}