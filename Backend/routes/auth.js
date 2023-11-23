const express = require("express");

const router = express.Router();

// controllers
const { login , signup, logout } = require("../controllers/Auth");


// **********************************Auth APIS************************************************

router.post("/signup" , signup );

router.post("/login" , login );

router.get("/logout" , logout );

// -------------------------------------------------------------------------------------------





module.exports = router;