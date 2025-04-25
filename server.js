const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "munimji_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Simulated chat response
app.post("/chat", (req, res) => {
  const userMsg = req.body.message;
  const reply = `You said: "${userMsg}" — Munimji is thinking!`;
  res.json({ reply });
});

// For all other routes, serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
