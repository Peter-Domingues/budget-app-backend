const express = require("express");
require("dotenv").config();
var cors = require("cors");
const incomingController = require("./controllers/incoming.controller");
const spendingController = require("./controllers/bill.controller");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// -------- Incoming --------

app.get("/api/incoming", (req, res) => {
  incomingController.getIncoming(req.query.month).then((data) => {
    res.json(data);
  });
});

app.get("/api/history", (req, res) => {
  req.query.month
    ? incomingController
        .getSpecificHistory(req.query.month, req.query.year)
        .then((data) => {
          res.json(data);
        })
    : incomingController.getAllHistory().then((data) => {
        res.json(data);
      });
});

app.post("/api/incoming", (req, res) => {
  console.log(req.body);
  incomingController.createIncoming(req.body).then((data) => res.json(data));
});

app.put("/api/incoming/:id", (req, res) => {
  incomingController
    .updateIncoming(req.params.id, req.body)
    .then((data) => res.json(data));
});

app.delete("/api/incoming/:id", (req, res) => {
  incomingController
    .deleteIncoming(req.params.id)
    .then((data) => res.json(data));
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Achernar</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
// -------- Bill --------

app.get("/api/bill", (req, res) => {
  req.query
    ? spendingController.getSpending(req.query.month).then((data) => {
        res.json(data);
      })
    : spendingController.getSpending().then((data) => {
        res.json(data);
      });
});

app.get("/api/bill/history", (req, res) => {
  spendingController.getAllHistory().then((data) => {
    res.json(data);
  });
});

app.post("/api/bill", (req, res) => {
  console.log(req.body);
  spendingController.createSpending(req.body).then((data) => res.json(data));
});

app.put("/api/bill/:id", (req, res) => {
  spendingController
    .updateSpending(req.params.id, req.body)
    .then((data) => res.json(data));
});

app.delete("/api/bill/:id", (req, res) => {
  spendingController
    .deleteSpending(req.params.id)
    .then((data) => res.json(data));
});
