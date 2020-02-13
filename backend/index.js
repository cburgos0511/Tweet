const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const Wiss = require("./model");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is established successfully");
});
app.get("/", (req, res) => {
  res.json({
    message: "Hello, World"
  });
});

app.get("/wiss", (req, res) => {
  Wiss.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json("Error: " + err));
});
function isValid(body) {
  return (
    body.name &&
    body.name.toString().trim() !== "" &&
    body.content &&
    body.content.toString().trim() !== ""
  );
}

app.post("/wiss", (req, res) => {
  if (isValid(req.body)) {
    const name = req.body.name.toString();
    const content = req.body.content.toString();

    const NewWiss = new Wiss({
      name,
      content
    });
    NewWiss.save()
      .then(createdWiss => res.json(createdWiss))
      .catch(err => res.status(400).json("Error: " + err));
    return NewWiss;
  } else {
    res.status(422);
    res.json({
      message: "Name and Content are require"
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
