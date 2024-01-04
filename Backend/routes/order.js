const express = require("express");

const router = express.Router();


// import controller
const { createOrder, getAllBuyOrders, deleteOrder, getAllSellOrders, getCutomerAllOrders, getOrder, getAllOrders }  = require("../controllers/Order");
const { payment, customerCredit, getAllPayments } = require("../controllers/Payment");


// **********************************Order APIS************************************************

router.post("/create" , createOrder );

router.post("/getOrder" , getOrder );

router.get("/getAllBuyOrders" , getAllBuyOrders );

router.get("/getAllSellOrders" , getAllSellOrders );

router.post("/getCutomerAllOrdres" , getCutomerAllOrders );


router.get("/getAllOrders" , getAllOrders );

// router.post("/delete" , deleteOrder );

// -----------------------------------------------------------------------------------------

// *********************************Payment APIs********************************************

router.post("/payment" , payment );

router.post("/cutomerCredit" , customerCredit );

router.get("/getAllPayments", getAllPayments)


// -----------------------------------------------------------------------------------------



module.exports = router;