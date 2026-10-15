require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const customerRoute = require("./routes/customer");

app.use("/customer", customerRoute);

const dashboardRoute = require("./routes/dashboard");

app.use("/dashboard", dashboardRoute);

const reportRoute = require("./routes/report");

app.use("/report", reportRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});