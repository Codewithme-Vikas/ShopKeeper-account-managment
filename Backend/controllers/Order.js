const mongoose = require("mongoose");

const Cutomer = require("../models/Cutomer")
const Order = require("../models/Order");


// ****************************Create Order******************************
exports.createOrder = async (req, res) => {
    try {
        const { orderPrice, customer, type, product } = req.body;

        if (!orderPrice || !customer || !type || !product) {
            return res.status(400).json({ success: false, message: "provide all information." });
        }

        // store into DB
        const orderDoc = await Order.create({
            product,
            orderPrice,
            customer,
            type
        });


        return res.status(200).json({
            success: true,
            message: "Order is created",
            orderDoc
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
        const isOrderExists = await Order.findById( id );

        if( !isOrderExists ){
            return res.status(400).json({ success : false , message : "Order is not exists"});
        }

        // Delete order from DB
        const orderDoc = await Order.findByIdAndDelete(id);


        return res.status(200).json({
            success: true,
            message: "Order is created",
            orderDoc
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
        
        const allBuyOrders = await Order.find( { type : "buy" });


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
        
        const allSellOrders = await Order.find( { type : "sell" });


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



// ****************************Get All Orders of Specific Seller******************************
exports.getCutomerAllOrders = async (req, res) => {
    try {
        const { id } = req.body;

        const objectId = mongoose.Types.ObjectId(id);

        const cutomerDoc = await Cutomer.findById( id );
        
        const customerAllOrders = await Order.find( { customer : objectId });


        return res.status(200).json({
            success: true,
            message: "Successfully getting all  customer All Orders",
            cutomerDoc,
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


// ****************************Get All Orders of Specific Product******************************
exports.getCutomerAllOrders = async (req, res) => {
    try {
        const { id } = req.body;

        const objectId = mongoose.Types.ObjectId(id);

        const customerAllOrders = await Order.find( { customer : objectId });


        return res.status(200).json({
            success: true,
            message: "Successfully getting all  customer All Orders",
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
