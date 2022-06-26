const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require('./config/dbConfig');

dotenv.config();

//-------------------------------Routes------------------------------
const authRoute = require("./routes/auth");

//-------------------------------Define Middleweares------------------
const errorHandler = require("./middleweares/errorHandler");

//------------------------------Database Connection------------------------
dbConnection.dbConnect();

//-----------------------------App has to use JSON request------------------
app.use(express.json());
app.use(cors());

//-----------------------------Use Router to define endpoint-----------------
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Backend server is running on ${process.env.PORT}`);
});