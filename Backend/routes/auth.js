const express = require("express");

const router = express.Router();

// controllers
const { login , signup, logout } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword")

// **********************************Auth APIS************************************************

router.post("/signup" , signup );

router.post("/login" , login );

router.get("/logout" , logout );

router.post("/resetPasswordToken" , resetPasswordToken );

router.post("/resetPassword" , resetPassword );

// -------------------------------------------------------------------------------------------





module.exports = router;