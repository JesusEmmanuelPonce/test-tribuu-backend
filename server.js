require("dotenv").config({ path : ".env" });
const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");
const weeklyRoute = require("./routes/weekly");

connectDB()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", weeklyRoute);

app.listen(PORT, () => {
    console.log("server ready");
});