const express = require("express");

const router = express.Router();

// controllers
const { getAllCustomers , updateCustomer , getCustomer } = require("../controllers/Customer");


// **********************************Auth APIS************************************************


router.post("/getCustomer" , getCustomer );

router.get("/getAllCustomers" , getAllCustomers );

router.post("/update" , updateCustomer );


// -------------------------------------------------------------------------------------------





module.exports = router;