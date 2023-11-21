import { useNavigate } from "react-router-dom"

import { gstRates, gstTypes } from "../../data/GST.js";

export default function CreateOrderForm({ totalPrice, finalPrice, optionCustomers, orderData, setOrderData, submitHandler }) {

    const navigate = useNavigate();


    function changeHandler(e) {
        setOrderData(prevData => {
            // return the object with previous field(data) and update target field
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }



    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-6 flex-wrap items-start justify-center">


            <div className="flex items-center gap-6 flex-wrap">


                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="customerId">Customer</label>
                    <select
                        name="customerId"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={changeHandler}
                        value={orderData.customerId}
                    >
                        <option value="" disabled>
                            Choose an customer
                        </option>
                        {
                            optionCustomers?.map((customer) => {
                                return (
                                    <option value={customer._id} key={customer._id}>{customer.name}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="invoiceNo">Invoice No.</label>
                    <input
                        type="text"
                        name="invoiceNo"
                        value={orderData.invoiceNo}
                        onChange={changeHandler}
                        required
                        className="p-1 rounded text-black outline-none"
                    />
                </div>


                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={orderData.date}
                        onChange={changeHandler}
                        required
                        className="p-1 rounded text-black outline-none"
                    />
                </div>


                <div className="flex gap-2 items-center justify-center italic">
                    <label htmlFor="orderPrice">Total Price :</label>
                    <input
                        type="number"
                        name="orderPrice"
                        value={totalPrice}
                        readOnly
                        className="p-1 rounded text-white outline-none bg-slate-600"
                    />
                </div>


                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="enterPrice">Enter Order Price</label>
                    <input
                        type="number"
                        name="enterPrice"
                        value={orderData.enterPrice}
                        onChange={changeHandler}
                        className="p-1 rounded text-black outline-none"
                        placeholder="Enter order price"
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="discount">Discount</label>
                    <input
                        type="number"
                        name="discount"
                        value={orderData.discount}
                        onChange={changeHandler}
                        className="p-1 rounded text-black outline-none"
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="discountedPrice">Price after discount</label>
                    <input
                        type="number"
                        name="discountedPrice"
                        value={orderData.enterPrice - orderData.discount}
                        readOnly
                        className="p-1 rounded text-white bg-slate-600 outline-none"
                    />
                </div>

                {/* GST inputs start */}
                <div className="flex gap-2 flex-col w-full">
                    <div className="text-lg">GST :</div>

                    <div className="flex gap-6">

                        {/* gst 1 */}
                        <div className="flex gap-2 items-center justify-center">

                            <label htmlFor="gst1">1</label>
                            <select
                                name="gst1"
                                value={orderData.gst1}
                                onChange={changeHandler}
                                className="p-2 px-4 rounded text-black outline-none"
                            >
                                <option value="" disabled>
                                    Choose GST type
                                </option>
                                {
                                    gstTypes?.map((type) => {
                                        return (
                                            <option value={type.name} key={type.id}>{type.name}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        <div className="flex gap-2 items-center justify-center">

                            <label htmlFor="gst1Rate">Rate :</label>
                            <select
                                name="gst1Rate"
                                value={orderData.gst1Rate}
                                onChange={changeHandler}
                                className="p-2 px-4 rounded text-black outline-none"
                            >
                                <option value={0} disabled>
                                    Choose GST rate
                                </option>
                                {
                                    gstRates?.map((gstRate) => {
                                        return (
                                            <option value={gstRate.rate} key={gstRate.id}>{gstRate.rate}{"%"}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        {/* gst 2 */}
                        <div className="flex gap-2 items-center justify-center">

                            <label htmlFor="gst2">2</label>
                            <select
                                name="gst2"
                                value={orderData.gst2}
                                onChange={changeHandler}
                                className="p-2 px-4 rounded text-black outline-none"
                            >
                                <option value="" disabled>
                                    Choose GST type
                                </option>
                                {
                                    gstTypes?.map((type) => {
                                        return (
                                            <option value={type.name} key={type.id}>{type.name}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        <div className="flex gap-2 items-center justify-center">

                            <label htmlFor="gst2Rate">Rate :</label>
                            <select
                                name="gst2Rate"
                                value={orderData.gst2Rate}
                                onChange={changeHandler}
                                className="p-2 px-4 rounded text-black outline-none"
                            >
                                <option value={0} disabled>
                                    Choose GST rate
                                </option>
                                {
                                    gstRates?.map((gstRate) => {
                                        return (
                                            <option value={gstRate.rate} key={gstRate.id}>{gstRate.rate}{"%"}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                    </div>

                </div>
                {/* GST inputs End */}

                <div className=" flex gap-2 items-center justify-center">
                    <p >Total GST :</p>
                    <p className="p-2 px-4 rounded text-white bg-slate-600">
                        {
                            Number(orderData.gst1Rate) + Number(orderData.gst2Rate)
                        }%
                    </p>
                </div>

                <div className=" flex gap-2 items-center justify-center">

                    <label htmlFor="finalPrice">Final Price :</label>
                    <input
                        type="number"
                        name="finalPrice"
                        value={finalPrice}
                        readOnly
                        className="p-1 rounded text-white bg-slate-600 outline-none"
                    />
                </div>


            </div>




            <div className="flex gap-6">
                <button className="bg-rose-800 p-2 px-6 rounded outline-none hover:bg-rose-700">Create</button>
                <button type="button" onClick={() => navigate(-1)} className="bg-blue-800 p-2 px-6 rounded outline-none hover:bg-blue-700">Cancle</button>
            </div>


        </form>
    )
}