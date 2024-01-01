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
                state: formData.state,
                district: formData.district,
                city: formData.city
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
       

        <div className="max-w-4xl mx-auto my-8 p-4  shadow-md shadow-slate-600 rounded-lg">
            <p className="text-lg text-rose-500 my-1">Add new customer...</p>

            <form onSubmit={submitHandler} className="flex gap-7 flex-wrap p-4 my-4 text-[16px]">

                {/* name and email */}
                <div className="flex gap-12 w-full items-center justify-between">

                    <div className="flex flex-col w-full gap-2 relative">
                        <label htmlFor="name" className="text-slate-500 after:content-['*'] after:ml-0.5 after:text-red-500">Customer Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="p-[6px] rounded text-slate-800 bg-white outline-none"
                            placeholder="Enter customer name"
                            onChange={changeHandler}
                            value={formData.name}
                        />
                        <p className="absolute text-red-500 text-sm left-0 top-[100%]">
                            Username must be unique.
                        </p>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="email" className="text-slate-500">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="p-[6px] rounded text-slate-800 bg-white outline-none"
                            placeholder="customer@email.com"
                            onChange={changeHandler}
                            value={formData.email}
                        />
                    </div>
                </div>

                {/* pan , GSTNo, phone and address */}
                <div className="flex gap-12 w-full justify-between">

                    <div className="flex flex-col w-full gap-4">

                        {/* phone */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-slate-500 after:content-['*'] after:ml-0.5 after:text-red-500">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                className="p-[6px] rounded text-slate-800 bg-white outline-none"
                                placeholder="Enter the customer phone number"
                                onChange={changeHandler}
                                value={formData.phone}
                            />
                        </div>

                        {/* GST number */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="GSTNumber" className="text-slate-500">GST No</label>
                            <input
                                type="text"
                                name="GSTNumber"
                                className="p-[6px] rounded text-slate-800 bg-white outline-none"
                                placeholder="Enter the GST number"
                                onChange={changeHandler}
                                value={formData.GSTNumber}
                            />
                        </div>

                        {/* PAN number */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="PAN" className="text-slate-500">PAN</label>
                            <input
                                type="text"
                                name="PAN"
                                className="p-[6px] rounded text-slate-800 bg-white outline-none"
                                placeholder="Enter the PAN number"
                                onChange={changeHandler}
                                value={formData.PAN}
                            />
                        </div>

                    </div>

                    {/* address */}
                    <div className="flex flex-col w-full gap-4">


                        <div className="flex flex-col gap-1">
                            <label htmlFor="state" className="text-slate-500">State</label>
                            <select
                                name="state"
                                className="p-[5px] px-4 rounded text-slate-800 bg-white outline-none"
                                onChange={changeHandler}
                                value={formData.state}
                            >
                                <option value="" disabled>Choose an option</option>
                                {states.map((state, index) => (
                                    <option value={state.state} key={index}>{state.state}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="district" className="text-slate-500">District</label>
                            <select
                                name="district"
                                className="p-[6px] px-4 rounded text-slate-800 bg-white outline-none"
                                onChange={changeHandler}
                                value={formData.district}
                            >
                                <option value="" disabled>Choose an option</option>
                                {states.find(ele => ele.state === formData.state)?.districts?.map((district, index) => (
                                    <option value={district} key={index}>{district}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="city" className="text-slate-500">City</label>
                            <input
                                type="text"
                                name="city"
                                className="p-[6px] rounded text-slate-800 bg-white outline-none"
                                onChange={changeHandler}
                                value={formData.city}
                                placeholder="Enter local address"
                            />
                        </div>

                    </div>

                </div>

                {/* type */}
                <div className="flex w-full gap-2 items-center">
                    <label htmlFor="accountType" className="text-slate-500 after:content-['*'] after:ml-0.5 after:text-red-500">Type :</label>
                    <select
                        name="accountType"
                        required
                        className="p-2 px-6 rounded text-slate-800 bg-white outline-none"
                        onChange={changeHandler}
                        value={formData.accountType}
                    >
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                </div>

                <button className="bg-slate-800 p-2 px-6 rounded text-white hover:bg-slate-700">Add</button>

            </form>

        </div>

    )
}