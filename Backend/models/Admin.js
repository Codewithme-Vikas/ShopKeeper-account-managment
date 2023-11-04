const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({

    name :  { type : String , required : true , trim : true , unique : true },

    email : { type : String , trim : true , unique : true },
    phone : { type : String },
    address : { type : String },

    password : { type : String , required : true },

},{
    timestamps : true ,
});


module.exports = mongoose.model("Admin" , adminSchema );