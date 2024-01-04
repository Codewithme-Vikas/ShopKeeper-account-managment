const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    invoiceNo : { type : String, required : true, unqiue : true },

    orderPrice   : { type  : Number },

    discount : {type : Number , default : 0 },

    type  : { type : String , enum  : [ "Buy" , "Sell" ] , required : true },
    
    customer : { type : mongoose.Schema.Types.ObjectId , ref : "Customer" , required : true},

    products : [ 
        {
            product : { type : mongoose.Schema.Types.ObjectId , ref : "Product" , required : true },
            productName : { type : String , required : true },
            price : { type : Number },
            
            quantity : { type : Number , required : true },
            height : { type : Number },
            width : { type : Number }
        }
    ],

    GST : { 
        GST1 : { name : String , rate : Number },
        GST2 : { name : String , rate : Number },
    },

    note : { type: String },

},{
    timestamps : true,
});


module.exports = mongoose.model( "Order" , orderSchema );