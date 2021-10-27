require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db");
const userController = require("./controllers/users.controller");

app.use(express.json());

app.use("/users", userController);
app.use("", (req, res) => {
  return res.status(400).send("Result Not Found");
});

const PORT = process.env.PORT;
module.exports = start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
