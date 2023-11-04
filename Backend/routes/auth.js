const express = require("express");

const router = express.Router();

// controllers
const { login , singup } = require("../controllers/Auth");


// **********************************Auth APIS************************************************

router.post("/singup" , singup );

router.post("/login" , login );

// -------------------------------------------------------------------------------------------





module.exports = router;