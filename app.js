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

app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const sum = parseInt(a, 10) + parseInt(b, 10);
  const result = `The sum of a and b is ${sum}`;
  res.send(result);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;
  const numShift = parseInt(shift);

  const base = "A".charCodeAt(0); // get char code?

  const cipher = text
    .toUpperCase()
    .split("")
    .map(char => {
      const code = char.charCodeAt(0);

      if (code < base || code > base + 26) {
        return char;
      }
      let diff = code - base;
      diff = diff + numShift;

      diff = diff % 26;

      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    });

  res.send(cipher);
});

app.get("/lotto", (req, res) => {
  const array = req.query.arr;
  const myArray = [];
  for (let i = 0; i <= 6; i++) {
    myArray.push(Math.floor(Math.random() * 20));
  }
  let diff = myArray.filter(n => !array.includes(n));
  if (diff.length > 4) {
    res.send("Sorry, you guessed fewer than 2 correct");
  } else if (diff.length === 2) {
    res.send("Congrats! You win a free ticket!");
  } else if (diff.length === 0) {
    res.send("Wow! Somehow you guessed all correct!");
  }
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
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom, where you will thrive.`;

  res.send(greeting);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
