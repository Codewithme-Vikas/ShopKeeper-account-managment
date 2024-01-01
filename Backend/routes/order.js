const express = require("express");

const router = express.Router();


// import controller
const { createOrder, getAllBuyOrders, deleteOrder, getAllSellOrders, getCutomerAllOrders, getOrder }  = require("../controllers/Order");
const { payment, customerCredit } = require("../controllers/Payment");


// **********************************Order APIS************************************************

router.post("/create" , createOrder );

router.post("/getOrder" , getOrder );

router.get("/getAllBuyOrders" , getAllBuyOrders );

router.get("/getAllSellOrders" , getAllSellOrders );

router.post("/getCutomerAllOrdres" , getCutomerAllOrders );

// router.post("/delete" , deleteOrder );

// -----------------------------------------------------------------------------------------

// *********************************Payment APIs********************************************

router.post("/payment" , payment );

router.post("/cutomerCredit" , customerCredit );


// -----------------------------------------------------------------------------------------



module.exports = router;