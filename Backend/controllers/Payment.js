const { default: mongoose } = require("mongoose");
const Payment = require("../models/Payment");
const Customer = require("../models/Payment");



// ***************************Payment, except order time************************************
exports.payment = async (req, res) => {
    try {
        const { customerId, amount } = req.body;

        if (!customerId || (amount <= 0)) {
            return res.status(400).json({ success: false, message: "customer id or  amount is missing " });
        }

        // is customer exsist
        const isCustomerExsist = await Customer.findById(customerId);

        if (!isCustomerExsist) {
            return res.status(400).json({ success: false, message: "Customer is not exsits" });
        }

        // create payment
        const paymentDoc = await Payment.create({
            customer: customerId,
            amount
        });

        // store payment id into customer
        await Customer.findByIdAndUpdate(customerId, {
            $push: { payments: paymentDoc._id }
        }, { new: true });


        return res.status(200).json({
            success: true,
            message: "successfully submit the payment",
            paymentDoc
        });


    } catch (error) {
        console.log(error, "Error in payment controller");
        return res.status(400).json({
            success: false,
            message: "Failed to create payment",
            error: error.message
        })
    }
}



// *******************************Credit of a user*******************************************
exports.customerCredit = async (req, res) => {
    try {
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ success: false, message: "Provide customer id " });
        }

        // is customer exsits
        const isCustomerExsist = await Customer.findById(customerId);

        if (!isCustomerExsist) {
            return res.status(400).json({ success: false, message: "There is no such user " });
        }

        // Aggregate credit
        const creditDetailsDoc = await Customer.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(customerId)
                }
            },
            {
                $lookup: {
                    from: "orders", // The name of the "Order" collection
                    localField: "orders",
                    foreignField: "_id",
                    as: "orderDetails"
                }
            },
            {
                $unwind: {
                    path: "$orderDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    totalOrderAmount: { $sum: "$orderDetails.orderAmount" },
                    totalPaymentAmount: { $sum: "$payments.amount" }
                }
            }
        ])



        return res.status(200).json({
            success: true,
            message: "successfully submit the payment",
            creditDetailsDoc
        });


    } catch (error) {
        console.log(error, "Error in customer Credit controller");
        return res.status(400).json({
            success: false,
            message: "Failed to get customer credit",
            error: error.message
        })
    }
}