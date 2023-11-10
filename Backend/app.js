const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// intitalize express top level application
const app = express();

// PORT
const PORT = process.env.PORT;

// databse connection
const { dbConnect } = require("./config/database");
dbConnect();

// Middlewares
app.use( express.json() );

app.use( cookieParser() );  

// Routes
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");

const { auth , isAdmin } = require("./middlewares/auth");


app.use("/api/v1/order" , auth , isAdmin ,  orderRoute );
app.use("/api/v1/product" , auth , isAdmin,  productRoute );
app.use("/api/v1/auth" , authRoute );







app.listen( PORT , ()=>{
    console.log(`Website is listening on the port ${PORT}`);
});