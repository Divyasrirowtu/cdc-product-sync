const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());

app.use(productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Write service running on port ${process.env.PORT}`);
});