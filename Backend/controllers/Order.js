const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Payment = require("../models/Payment");


// ****************************Create Order******************************
// products will be array of objects ( objects contain prodcut id and quantity )
exports.createOrder = async (req, res) => {
    try {
        const { customerId, type, products, orderPrice, payAmount, discount = 0 } = req.body;

        if (!orderPrice || !customerId || !type || !products || payAmount < 0) {
            return res.status(400).json({ success: false, message: "provide all information." });
        }

        // is customer exsist
        const isCustomerExsist = await Customer.findById(customerId);

        if (!isCustomerExsist) {
            return res.status(400).json({ success: false, message: "There is no such cutomer" });
        }


        // store order into DB
        const orderPriceAfterDiscount = orderPrice - discount;

        const orderDoc = await Order.create({
            products: products,
            orderPrice: orderPriceAfterDiscount,
            customer: customerId,
            type
        });

        // create amount
        let paymentDoc;
        if (payAmount !== 0) {
            paymentDoc = await Payment.create({
                customer: customerId,
                amount: payAmount
            });
        }

        // store orderId into cutomer
        const customerDoc = await Customer.findByIdAndUpdate(customerId, {
            $push: {
                orders: orderDoc._id,
                payments: paymentDoc._id,
            },
        }, { new: true });


        return res.status(200).json({
            success: true,
            message: "Order is created",
            orderDoc,
            customerDoc
        });

    } catch (error) {
        console.log(error, "Error in create order controller");
        return res.status(400).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        })
    }
};



// ****************************Delete Order******************************
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide id." });
        }

        // Is order exits
        const isOrderExists = await Order.findById(id);

        if (!isOrderExists) {
            return res.status(400).json({ success: false, message: "Order is not exists" });
        }

        // Delete order from DB
        const orderDoc = await Order.findByIdAndDelete(id);

        // update customer
        const customerDoc = await Customer.findByIdAndUpdate(orderDoc.customer, {
            $pull: { orders: orderDoc._id },
        }, { new: true });



        return res.status(200).json({
            success: true,
            message: "Order is created",
            orderDoc,
            customerDoc
        });

    } catch (error) {
        console.log(error, "Error in delete order controller");
        return res.status(400).json({
            success: false,
            message: "Failed to delete order",
            error: error.message
        })
    }
};



// ****************************Get All buying Orders******************************
exports.getAllBuyOrders = async (req, res) => {
    try {

        const allBuyOrders = await Order.find({ type: "buy" }).populate("products").exec();


        return res.status(200).json({
            success: true,
            message: "Successfully getting all buying orders",
            allBuyOrders
        });

    } catch (error) {
        console.log(error, "Error in get all buying orders controller");
        return res.status(400).json({
            success: false,
            message: "Failed to get all buying  orders",
            error: error.message
        })
    }
};



// ****************************Get All Selling Orders******************************
exports.getAllSellOrders = async (req, res) => {
    try {

        const allSellOrders = await Order.find({ type: "sell" }).populate("products").exec();


        return res.status(200).json({
            success: true,
            message: "Successfully getting all selling orders",
            allSellOrders
        });

    } catch (error) {
        console.log(error, "Error in get all selling orders controller");
        return res.status(400).json({
            success: false,
            message: "Failed to  getting all selling orders",
            error: error.message
        })
    }
};



// ****************************Get All Orders of Specific Customer******************************
exports.getCutomerAllOrders = async (req, res) => {
    try {
        const { id } = req.body;

        const customerDoc = await Customer.findById(id);

        const customerAllOrders = await Order.find({ customer: customerDoc._id }).populate("products").exec();


        return res.status(200).json({
            success: true,
            message: "Successfully getting all  customer All Orders",
            customerDoc,
            customerAllOrders
        });

    } catch (error) {
        console.log(error, "Error in get customerAllOrders controller");
        return res.status(400).json({
            success: false,
            message: "Failed to  getting all orders realted to specific cutomer orders",
            error: error.message
        })
    }
};


// To Do : ****************************Get All Orders of Specific Product******************************
