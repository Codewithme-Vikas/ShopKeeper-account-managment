import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { states } from '../../data/states'

export default function CreateCustomer() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", email: "", city: "", state: "", district: "", phone: "", GSTNumber: "", PAN: "", accountType: "Buyer"
    });

    async function submitHandler(e) {
        e.preventDefault();

        try {
            formData["address"] = { 
                state : formData.state,
                district : formData.district,
                city : formData.city
            };

            const response = await fetch(`http://localhost:3000/api/v1/customer/createCustomer`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })

            const data = await response.json();
            if (data.success) {
                toast.success("Customer successfully added!");
                return navigate("/list/customer");
            } else {
                toast.error(data.message)
                return false;
            }
        } catch (error) {
            console.log(error, "create customer handler");
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

            <form onSubmit={submitHandler} className="flex gap-6 flex-wrap items-center my-4 border py-8 px-4">

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="name">Customer Name</label>
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

                <div className="flex flex-col w-full gap-2 justify-center items-start">
                    <p>Address : </p>
                    <div className="flex gap-2 items-center justify-center ps-2">
                        <label htmlFor="state">State</label>
                        <select
                            name="state"
                            required
                            className="p-2 px-4 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={formData.state}
                        >
                            <option value="" disabled>Choose an option</option>
                            {
                                states.map((state, index) => (
                                    <option value={state.state} key={index}>{state.state}</option>
                                ))
                            }
                        </select>



                        <label htmlFor="district">District</label>
                        <select
                            name="district"
                            required
                            className="p-2 px-4 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={formData.state}
                        >
                            <option value="" disabled>Choose an option</option>
                            {
                                states.find(ele => ele.state === formData.state)?.districts?.map((district, index) => (
                                    <option value={district} key={index}>{district}</option>
                                ))
                            }
                        </select>


                        <label htmlFor="City">City: </label>
                        <input
                            type="text"
                            name="city"
                            className="p-1 rounded text-black outline-none"
                            onChange={changeHandler}
                            value={formData.city}
                            placeholder="Enter local address"
                        />
                    </div>


                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="GSTNumber">GSTNumber</label>
                    <input
                        type="text"
                        name="GSTNumber"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.GSTNumber} />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="PAN">PAN</label>
                    <input
                        type="text"
                        name="PAN"
                        required
                        className="p-1 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={formData.PAN} />
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