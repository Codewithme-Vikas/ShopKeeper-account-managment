const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    product : [ { type : mongoose.Schema.Types.ObjectId , ref : "Product" } ],

    orderPrice   : { type  : Number },

    customer : { type : mongoose.Schema.Types.ObjectId , ref : "Customer" },

    type  : { type : String , enum  : [ "buy" , "sell" ] },

},{
    timestamps : true,
});


module.exports = mongoose.model( "Order" , orderSchema );