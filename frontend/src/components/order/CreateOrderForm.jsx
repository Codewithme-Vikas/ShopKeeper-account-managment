import { useNavigate } from "react-router-dom"

import { gstRates, gstTypes } from "../../data/GST.js";

export default function CreateOrderForm({ invoiceNo,setInvoiceNo, totalPrice, finalPrice, optionCustomers, orderData, setOrderData, submitHandler }) {

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
        <form onSubmit={submitHandler} className="flex flex-col  gap-12">

            <div className="flex items-center gap-3 flex-wrap">



                {/* customer name  */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="customerId" className="after:content-['*'] after:ml-0.5 after:text-red-500">Customer</label>
                    <select
                        name="customerId"
                        required
                        className="p-[6px] px-4 rounded text-black outline-none"
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


                {/* invoice number and total price */}
                <div className="flex gap-12 w-full">

                    {/* invoice no */}
                    <div className="flex gap-12 w-full">

                        <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="invoiceNo" className="after:content-['*'] after:ml-0.5 after:text-red-500">Invoice No.</label>
                            <input
                                type="text"
                                name="invoiceNo"
                                required
                                value={invoiceNo}
                                onChange={ (e)=> setInvoiceNo(e.target.value)}
                                className="p-[6px] rounded text-black outline-none"
                                placeholder="Enter invoice number"
                            />
                        </div>


                    </div>


                    {/* total price */}
                    <div className="flex flex-col w-full gap-1 italic">
                        <label htmlFor="orderPrice">Order Price :</label>
                        <input
                            type="number"
                            name="orderPrice"
                            value={totalPrice}
                            readOnly
                            className="p-[6px] rounded text-white outline-none bg-slate-600"
                        />
                    </div>


                </div>



                {/* total price and Enter order price */}
                <div className="flex gap-12 w-full">

                    {/* <div className="flex flex-col w-full gap-1 italic">
                        <label htmlFor="orderPrice">Order Price :</label>
                        <input
                            type="number"
                            name="orderPrice"
                            value={totalPrice}
                            readOnly
                            className="p-[6px] rounded text-white outline-none bg-slate-600"
                        />
                    </div> */}


                    {/* <div className="flex flex-col w-full gap-1">
                        <label htmlFor="enterPrice" className="after:content-['*'] after:ml-0.5 after:text-red-500">Enter Order Price</label>
                        <input
                            type="number"
                            name="enterPrice"
                            value={  orderData.enterPrice}
                            onChange={changeHandler}
                            className="p-[6px] rounded text-black outline-none"
                            placeholder="Enter order price"
                        />
                    </div> */}


                </div>


                {/* discount and priceAfterDiscount */}
                <div className="flex gap-12 w-full">

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="discount">Discount</label>
                        <input
                            type="number"
                            name="discount"
                            value={orderData.discount}
                            onChange={changeHandler}
                            className="p-[6px] rounded text-black outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="discountedPrice">Price after discount</label>
                        <input
                            type="number"
                            name="discountedPrice"
                            value={totalPrice - orderData.discount}
                            readOnly
                            className="p-[6px] rounded text-white bg-slate-600 outline-none"
                        />
                    </div>


                </div>


                {/* GST inputs start */}
                <div className="flex gap-2 flex-col w-full">
                    <div className="text-lg text-center">GST :</div>

                    <div className="flex gap-12 w-full">

                        {/* gst 1 */}
                        <div className="flex gap-2 w-full justify-between">

                            {/* gst type */}
                            <div className="flex flex-col w-full gap-1">

                                <label htmlFor="gst1">GST type 1</label>
                                <select
                                    name="gst1"
                                    value={orderData.gst1}
                                    onChange={changeHandler}
                                    className="p-[6px] px-4 rounded text-black outline-none"
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

                            {/* gst rate */}
                            <div className="flex flex-col w-full gap-1">

                                <label htmlFor="gst1Rate">Rate</label>
                                <select
                                    name="gst1Rate"
                                    value={orderData.gst1Rate}
                                    onChange={changeHandler}
                                    className="p-[6px] px-4 rounded text-black outline-none"
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


                        {/* gst 2 */}
                        <div className="flex gap-2 w-full  justify-between">

                            <div className="flex flex-col w-full gap-1">

                                <label htmlFor="gst2">GST type 2</label>
                                <select
                                    name="gst2"
                                    value={orderData.gst2}
                                    onChange={changeHandler}
                                    className="p-[6px] px-4 rounded text-black outline-none"
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

                            <div className="flex flex-col w-full gap-1">

                                <label htmlFor="gst2Rate">Rate</label>
                                <select
                                    name="gst2Rate"
                                    value={orderData.gst2Rate}
                                    onChange={changeHandler}
                                    className="p-[6px] px-4 rounded text-black outline-none"
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

                </div>
                {/* GST inputs End */}


                {/* total GST and final price */}
                <div className="flex gap-12 w-full">

                    <div className=" flex flex-col w-full gap-1">
                        <p >Total GST :</p>
                        <p className="p-[6px] px-4 rounded text-white bg-slate-600">
                            {
                                Number(orderData.gst1Rate) + Number(orderData.gst2Rate)
                            }%
                        </p>
                    </div>

                    <div className=" flex flex-col w-full gap-1">

                        <label htmlFor="finalPrice">Final Price :</label>
                        <input
                            type="number"
                            name="finalPrice"
                            value={finalPrice}
                            readOnly
                            className="p-[6px] rounded text-white bg-slate-600 outline-none"
                        />
                    </div>

                </div>

                {/* note or additional message */}
                <div className="flex gap-12 w-full">

                    <div className=" flex flex-col w-full gap-1">

                        <label htmlFor="note">Note :</label>
                        <textarea
                            value={orderData.note}
                            onChange={changeHandler}
                            name="note"
                            id="note"
                            cols="30"
                            rows="3"
                            className="p-[6px] rounded text-black outline-none "
                            placeholder="Enter any additional message..."
                        >
                        </textarea>
                       
                    </div>

                </div>


            </div>




            <div className="flex gap-6">
                <button className="bg-blue-700 text-white p-2 px-6 rounded outline-none hover:bg-blue-600">Create</button>
                <button type="button" onClick={() => navigate(-1)} className="bg-rose-700 p-2 px-6 rounded outline-none hover:bg-rose-500 text-white">Cancle</button>
            </div>


        </form>
    )
}