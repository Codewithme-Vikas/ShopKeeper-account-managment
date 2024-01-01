const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");


// ****************************Create Order******************************
// products will be array of objects ( objects contain prodcut name , quantity, width and height )
// GST will be object of two objects - GST1 AND GST2 : { name  , rate }
exports.createOrder = async (req, res) => {
    try {
        const { customerId, invoiceNo, type, products, orderPrice, GST, discount = 0, } = req.body;

        if (!orderPrice || !customerId || !invoiceNo || !type || !products) {
            return res.status(400).json({ success: false, message: "provide all information." });
        }

        // is customer exsist
        const isCustomerExsist = await Customer.findById(customerId);

        if (!isCustomerExsist) {
            return res.status(400).json({ success: false, message: "There is no such cutomer" });
        }

        // is products exists
        let isNotExists;
        await Promise.all(products.map(async (ele) => {
            const isProductExits = await Product.findById( ele.product);
            if (!isProductExits ) {
                isNotExists = true;
                return;
            }
            // // if stock is less then sell quantity of product in sell type Order 
            // const isFail = ( type === "Sell" ) && ( isProductExits?.currentStock - ele.quantity < 0 )
            // if( isFail ){
            //     isNotExists = true;
            //     return;
            // }
        }));

        if( isNotExists ){
            return res.status(400).json({success : false , message : `Product is not found.`});            
        }


        // change the stock of the products
        await Promise.all(products.map(async (ele) => {
            const quantity = (type === "Sell") ? -ele.quantity : ele.quantity;
            await Product.findByIdAndUpdate( ele.product, {
                $inc: { currentStock: quantity }
            });
        }));


        // store order into DB
        const orderDoc = await Order.create({
            products,
            orderPrice,
            discount,
            type,
            invoiceNo,
            GST,
            customer: customerId,
        });



        // store orderId and paymentId into customer
        const customerDoc = await Customer.findByIdAndUpdate(customerId, {
            $push: {
                orders: orderDoc._id,
            },
        }, { new: true });


        return res.status(200).json({
            success: true,
            message: "Order is created",
            orderDoc,
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
exports.getOrder = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide id." });
        }

        // Is order exits
        const orderDoc = await Order.findById(id)
                                .populate({ path : "customer", select :"name address phone email accountType GSTNumber PAN"})
                                .populate({
                                    path : "products",
                                    populate : { path : "product" }
                                }).exec();

        if (!orderDoc) {
            return res.status(400).json({ success: false, message: "Order is not exists" });
        }


        return res.status(200).json({
            success: true,
            message: "Order is successfully fetched.",
            orderDoc,
        });

    } catch (error) {
        console.log(error, "Error in get order controller");
        return res.status(400).json({
            success: false,
            message: "Failed to get order",
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
            message: "Order is deleted.",
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

        const allBuyOrders = await Order.find({ type: "Buy" })
            .populate({
                path: "products",
                populate: { path: "product", select: "productName price" }
            })
            .populate({ path: "customer", select: "name address phone" })
            .exec();


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

        const allSellOrders = await Order.find({ type: "Sell" })
            .populate({
                path: "products",
                populate: { path: "product", select: "productName price" }
            })
            .populate({ path: "customer", select: "name address phone" })
            .exec();


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
        const { customerId } = req.body;

        const customerAllOrders = await Customer.findById(customerId)
            .populate({ path: "payments", select: "createdAt amount" })
            .exec();

        if (!customerAllOrders) {
            return res.status(400).json({ success: false, message: "Customer is not exists!" });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully getting   customer All Orders",
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
