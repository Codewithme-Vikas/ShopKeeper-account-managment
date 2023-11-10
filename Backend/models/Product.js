const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    productName : { type : String , required : true , unique : true ,  trim : true },

    // quantity : { type : Number },

    price : { type : Number },

},{
    timestamps : true ,
});


module.exports = mongoose.model( "Product" , productSchema );