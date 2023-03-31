// Create a new directory for your project and navigate to it:
// mkdir node-list-app && cd node-list-app

// Initialize a new Node.js project:
// npm init -y

// Install the required packages:
// npm install express body-parser


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, ...updatedItem };
    } else {
      return item;
    }
  });
  res.json(updatedItem);
});

app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter((item) => item.id !== itemId);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Server started on port 3000"));
