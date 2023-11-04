const Product = require("../models/Product")


// **********************create Product***************************
exports.createProduct = async( req , res )=>{
    try {
        const { productName , quantity , buyPrice , sellPrice , description } = req.body;

        if( !productName ){
            return res.status(400).json({ success : false , message : "Provide product name"});
        }

        // is already exists
        const isExists = await Product.findOne( { productName} );

        if( isExists ){
            return res.status(400).json({ success : false , message : "Product is already exits."});
        }

        // store into DB
        const productDoc = await Product.create({
            productName,
            quantity,
            buyPrice,
            sellPrice,
            description
        });

        return res.status(200).json({
            success : true,
            message : "Product details store in db",
            productDoc,
        })

        
    } catch (error) {
        console.log( error , "Error in create product controller");
        return res.status(400).json({
            success : false,
            message : "Failed to create product",
            error : error.message
        })
    }
}


// **********************update Product***************************
exports.updateProduct = async( req , res )=>{
    try {
        const { id , productName , quantity , buyPrice , sellPrice , description } = req.body;

        if( !id ){
            return res.status(400).json({ success : false , message : "Provide product id"});
        }

        // is exists
        const isExists = await Product.findById(id);

        if( !isExists ){
            return res.status(400).json({ success : false , message : "Product is not exits."});
        }

        // update product 
        const productDoc = await Product.findByIdAndUpdate( id , {
            $set : {
                productName,
                quantity,
                buyPrice,
                sellPrice,
                description
            }
        },{ new : true });

        return res.status(200).json({
            success : true,
            message : "Product detail update successfully",
            productDoc,
        });

        
    } catch (error) {
        console.log( error , "Error in update product controller");
        return res.status(400).json({
            success : false,
            message : "Failed to update product",
            error : error.message
        })
    }
}


// *************************Get all Products***********************
exports.getAllProducts = async( req , res )=>{
    try {
        
        const allProductsDoc = await Product.find({});

        return res.status(200).json({
            success : true,
            message : "Get list of all products",
            allProductsDoc,
        })

        
    } catch (error) {
        console.log( error , "Error in get all products controller");
        return res.status(400).json({
            success : false,
            message : "Failed to get all products",
            error : error.message
        })
    }
}



// *************************delete Product ***********************
exports.deleteProduct = async( req , res )=>{
    try {
        const { id } = req.body;

        if( !id ){
            return res.status(400).json({ success : false , message : "Provide product id"});
        }

        // is  exits
        const isExists = await Product.findById( id );

        if( !isExists ){
            return res.status(400).json({ success : false , message : "Product is not exists."});
        }

        // delete into DB
        const productDoc = await Product.findByIdAndDelete( id );

        return res.status(200).json({
            success : true,
            message : "Product delte from DB",
            productDoc,
        })

        
    } catch (error) {
        console.log( error , "Error in delete product controller");
        return res.status(400).json({
            success : false,
            message : "Failed to delete product",
            error : error.message
        })
    }
}
