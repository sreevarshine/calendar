const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const FILE = "./events.json";

app.use(cors());
app.use(bodyParser.json());

// GET all events
app.get("/events", (req, res) => {
  const events = JSON.parse(fs.readFileSync(FILE));
  res.json(events);
});

// POST a new event
// Replace all events (used for delete/edit)
app.post("/overwrite", (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.status(200).json({ message: "Overwritten" });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
