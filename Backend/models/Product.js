const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    productName : { type : String , required : true , unique : true ,  trim : true },
    description : { type : String },

    quantity : { type : Number },

    buyPrice : { type : Number },
    
    sellPrice : { type : Number },

},{
    timestamps : true ,
});


module.exports = mongoose.model( "Product" , productSchema );