const Customer = require("../models/Customer");


// ***************************Get Customers************************************
exports.getCustomer = async (req, res) => {
    try {
        
        const { customerId } = req.body;

        if( !customerId ){
            return res.status(400).json({ success : false , message : "provide customer id"});
        }

        const customerDoc  = await Customer.findById( customerId )
                                .populate({path : "orders" , select : "orderPrice createdAt"})
                                .populate({path : "payments" , select : "amount createdAt"})
                                .exec();

        if( !customerDoc ){
            return res.status(400).json({success : false, message : "customer is not exists!"});
        }

        return res.status(200).json({
            success: true,
            message: "successfully get customer data",
            customerDoc
        });


    } catch (error) {
        console.log(error, "Error in get customer");
        return res.status(400).json({
            success: false,
            message: "Failed to get customer data",
            error: error.message
        })
    }
}


// ***************************Get all Customers************************************
exports.getAllCustomers = async (req, res) => {
    try {
        
        const allCustomersDoc = await Customer.find();

        return res.status(200).json({
            success: true,
            message: "successfully get customers data",
            allCustomersDoc
        });


    } catch (error) {
        console.log(error, "Error in get all customer");
        return res.status(400).json({
            success: false,
            message: "Failed to get all customer",
            error: error.message
        })
    }
}

// ***************************Update Customers************************************
exports.updateCustomer = async (req, res) => {
    try {
        
        const { customerId , name , email , phone , address } = req.body;

        if( !customerId ){
            return res.status(400).json({ success : false , message : "provide customer id"});
        }

        // is customer exits
        const isCustomerExists  = await Customer.findById( customerId );

        if( !isCustomerExists ){
            return res.status(400).json({success : false, message : "customer is not exists!"});
        }

        // update the customer document
        const customerDoc = await Customer.findByIdAndUpdate( customerId , {
            $set : {
                name , 
                email,
                phone,
                address
            }
        },{ new : true });

        return res.status(200).json({
            success: true,
            message: "successfully get customers data",
            customerDoc
        });


    } catch (error) {
        console.log(error, "Error in update customer");
        return res.status(400).json({
            success: false,
            message: "Failed to update customer",
            error: error.message
        })
    }
}

