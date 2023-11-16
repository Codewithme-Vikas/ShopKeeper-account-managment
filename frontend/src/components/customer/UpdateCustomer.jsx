import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getCustomer } from "../../services/operations/customer"

export default function UpdateCustomer({id}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({name: "", email: "", address: "", phone: "" , customerId : ""});

    async function submitHandler(e) {
        e.preventDefault();
        
        try {
            const response = await fetch( `http://localhost:3000/api/v1/customer/update`,{
                method : 'POST',
                body : JSON.stringify( formData ),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : "include"
            })
            
            const data = await response.json();
            if( data.success ){
                toast.success("Customer successfully updated!");
                return navigate("/customer/read");
            }else{
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error , "update customer handler");
            return null;
        }
    }
    

    async function fetchCustomerData( customerId ){
        const customer = await getCustomer( customerId );
        if( customer ){
            setFormData( ()=> {
                return {
                    customerId : customer._id,
                    name : customer.name,
                    email : customer.email,
                    address : customer.address,
                    phone : customer.phone,
                }
            })
        }
        return;
    }

    useEffect( ()=>{
        fetchCustomerData(id);
    },[]);

    function changeHandler(e) {
        setFormData(prevData => {
            // return the object with previous field(data) and update target field
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }


    return (
        <div>

            <p className="text-lg text-rose-500 my-1">Update customer...</p>

            <form onSubmit={ submitHandler }  className="flex gap-6 flex-wrap items-center my-4 border py-8 px-4">

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.name}
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.email
                        }
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.phone}
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.address}
                    />
                </div>

                <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Update</button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-blue-800 p-2 px-6 rounded outline-none hover:bg-blue-700"
                >
                    Go back
                </button>


            </form>

        </div>
    )
}