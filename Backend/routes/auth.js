const express = require("express");

const router = express.Router();

// controllers
const { login , signup } = require("../controllers/Auth");


// **********************************Auth APIS************************************************

router.post("/signup" , signup );

router.post("/login" , login );

// -------------------------------------------------------------------------------------------





module.exports = router;