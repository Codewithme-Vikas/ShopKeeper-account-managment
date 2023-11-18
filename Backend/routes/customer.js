const express = require("express");

const router = express.Router();

// controllers
const { getAllCustomers , updateCustomer , getCustomer, createCustomer } = require("../controllers/Customer");


// **********************************Auth APIS************************************************


router.post("/createCustomer" , createCustomer );

router.post("/getCustomer" , getCustomer );

router.get("/getAllCustomers" , getAllCustomers );

router.post("/update" , updateCustomer );


// -------------------------------------------------------------------------------------------





module.exports = router;