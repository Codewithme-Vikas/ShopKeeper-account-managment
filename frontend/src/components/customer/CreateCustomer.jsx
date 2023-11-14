import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", email: "", address: "", phone: "", password: "", accountType: "Buyer"
    });

    async function submitHandler(e) {
        e.preventDefault();
        
        try {
            formData["password2"] = formData.password; // because password2 is required attribute by API
            console.log( formData )
            const response = await fetch( `http://localhost:3000/api/v1/auth/signup`,{
                method : 'POST',
                body : JSON.stringify( formData ),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : "include"
            })
            
            const data = await response.json();
            if( data.success ){
                toast.success("Customer successfully added!");
                return navigate("/customer/read");
            }else{
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error , "create customer handler");
            return null;
        }
    }



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

            <p className="text-lg text-rose-500 my-1">Add new customer...</p>

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

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.password} />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="accountType">Type</label>
                    <select
                        name="accountType"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.type}
                    >
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                </div>

                <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Add</button>


            </form>

        </div>
    )
}