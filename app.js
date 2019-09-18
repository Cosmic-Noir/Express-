const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request: 
    Base URL: ${req.baseURL}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); // do not send any data back to the client
});

app.get("/greetings", (req, res) => {
  // 1. get values from query object:
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values:
  if (!name) {
    return res.status(400).send("Please provide a name");
  }
  if (!race) {
    return res.status(400).send("Please provide a race");
  }
  // 4 and 5. Values are valid, so proceed:
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  res.send(greeting);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
