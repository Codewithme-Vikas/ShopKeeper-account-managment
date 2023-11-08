const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    // products : [ { type : mongoose.Schema.Types.ObjectId , ref : "Product" } ],

    products : [ 
        {
            id : { type : mongoose.Schema.Types.ObjectId , ref : "Product"},
            quantity : { type : Number , required : true }
        }
    ],

    orderPrice   : { type  : Number },

    // discount : {type : Number , default : 0 }

    customer : { type : mongoose.Schema.Types.ObjectId , ref : "Customer" },

    type  : { type : String , enum  : [ "buy" , "sell" ] },

},{
    timestamps : true,
});


module.exports = mongoose.model( "Order" , orderSchema );