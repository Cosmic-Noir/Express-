const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
