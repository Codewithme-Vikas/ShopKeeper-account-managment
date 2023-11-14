const Customer = require("../models/Customer");



// ***************************Get all customers************************************
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

// ***************************Payment, except order time************************************
exports.deleteCustomer = async (req, res) => {
    try {
        const { customerId  } = req.body

        if(!customerId){
            return res.status(400).json({success : false , message : "Provide customer id "});
        }
        const customerDoc = await Customer.findByIdAndDelete( customerId );

        return res.status(200).json({
            success: true,
            message: "successfully get customers data",
            customerDoc
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