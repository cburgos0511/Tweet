const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello, World"
  });
});

app.post("/wiss", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
