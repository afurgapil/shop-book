const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/userRouter");
const ingredientRouter = require("./routes/ingredientRouter");

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/ingredients", ingredientRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
