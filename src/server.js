const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const { connectToDatabase } = require("./services/database");
const app = express();

http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectToDatabase();

// middleware for logging petitions
app.use((req, res, next) => {
  console.log("[Log] " + req.method + " " + req.path + " from: " + req.ip);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to ReadAgain API, please login");
});

module.exports = app;

