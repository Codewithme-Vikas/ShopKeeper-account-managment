const express = require("express");

const router = express.Router();

// controllers
const { getAllCustomers } = require("../controllers/Customer");


// **********************************Auth APIS************************************************

router.get("/getAllCustomers" , getAllCustomers );


// -------------------------------------------------------------------------------------------





module.exports = router;