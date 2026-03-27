const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let shipments = [];

// Admin login
app.post("/login", (req, res) => {
  if (
    req.body.email === "Fullupking@gmail.com" &&
    req.body.password === "1998Dodger$"
  ) {
    return res.sendStatus(200);
  }
  res.sendStatus(401);
});

// Create shipment
app.post("/create-shipment", (req, res) => {
  const shipment = {
    id: Math.random().toString(36).substring(2, 10).toUpperCase(),
    status: "Pending"
  };
  shipments.push(shipment);
  res.json(shipment);
});

// Track shipment
app.get("/track/:id", (req, res) => {
  const shipment = shipments.find(s => s.id === req.params.id);
  res.json(shipment || {});
});

// Update shipment
app.post("/update-status/:id", (req, res) => {
  const shipment = shipments.find(s => s.id === req.params.id);

  if (shipment) {
    shipment.status = req.body.status;
  }

  res.json(shipment);
});

app.listen(5000, () => console.log("Server running"));
