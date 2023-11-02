require("dotenv").config();
const express = require("express");
const connectDb = require("./db/connect");

const app = express();
const router = require("./routes/url");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./views"));
app.use(router);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Port : ${port} is being used...`));
  } catch (error) {
    console.log(error);
  }
};
start();
