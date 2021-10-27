require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DB;

const connect = () => {
  console.log(`Mongo DB connected`);
  return mongoose.connect(DB);
};

module.exports = connect;
