const mongoose = require("mongoose");


const customerSchema = new mongoose.Schema({

    name :  { type : String , required : true , trim : true },

    email : { type : String , trim : true , unique : true },
    phone : { type : String },
    address : { type : String },

    password : { type : String , required : true },

    accountType : { type : String , enum : [ "Buyer" , "Seller" ] , required : true },

    
    orders : [ { type : mongoose.Schema.Types.ObjectId , ref : "Order" } ],
    
    payments : [ { type : mongoose.Schema.Types.ObjectId , ref : "Payment" } ],

},{
    timestamps : true ,
});


module.exports = mongoose.model("Customer" , customerSchema );