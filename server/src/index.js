/* global require process*/

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares");
const logs = require("./api/logs");

mongoose
  .connect(process.env.MONGODB_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL_DEV,
  })
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hey, welcome!",
  });
});

app.use("/api/logs", logs);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
