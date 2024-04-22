const express = require("express");
const app = express();
require("dotenv/config");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT;
const connectDB = require("./mongodb/mongodb");
const cors = require("cors");
app.use(cors());

connectDB();

// import Routes
const userRoutes = require("./routes/users.routes");

// using user Routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
