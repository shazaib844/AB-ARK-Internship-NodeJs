const express = require("express");
const fileRoutes = require("./routes/file.route");

const app = express();

app.use("/file", fileRoutes);

module.exports = app;
