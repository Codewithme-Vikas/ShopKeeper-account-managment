const express = require("express");

const router = express.Router();

// import controller
const { createProduct , updateProduct, getAllProducts, deleteProduct} = require("../controllers/Product");


// ********************************** Product APIS************************************************
router.post("/create" , createProduct );

router.put("/update" , updateProduct );

router.get("/getAllProducts" , getAllProducts );

router.post("/delete" , deleteProduct );

// -----------------------------------------------------------------------------------------------



module.exports = router;