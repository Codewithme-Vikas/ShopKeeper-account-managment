const express = require("express");

const router = express.Router();


// import controller
const { createOrder, getAllBuyOrders, deleteOrder, getAllSellOrders, getCutomerAllOrders }  = require("../controllers/Order");


// **********************************Order APIS************************************************

router.post("/create" , createOrder );

router.get("/getAllBuyOrders" , getAllBuyOrders );

router.get("/getAllSellOrders" , getAllSellOrders );

router.post("/getCutomerAllOrdres" , getCutomerAllOrders );

router.post("/delete" , deleteOrder );

// -----------------------------------------------------------------------------------------





module.exports = router;