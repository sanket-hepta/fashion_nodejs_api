const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require('./config/dbConfig');

dotenv.config();

//-------------------------------Routes------------------------------
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

//-------------------------------Define Middleweares------------------
const errorHandler = require("./middleweares/errorHandler");

//------------------------------Database Connection------------------------
dbConnection.dbConnect();

//-----------------------------App has to use JSON request------------------
app.use(express.json());
app.use(cors());

//-----------------------------Use Router to define endpoint-----------------
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Backend server is running on ${process.env.PORT}`);
});