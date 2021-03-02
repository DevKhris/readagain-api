const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/config").get(process.env.NODE_ENV);

// models

const Book = require("./src/api/models/book");
const BookShelf = require("./src/api/models/bookshelf");

// Init
const app = express();

// App Config
// Extends parsing of x-url-encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express use CQRS
app.use(cors());

// Enviroment Config

// Database Config
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err, conn) {
    if (err) console.log(`[Error]: ${err}`);
    console.log("[+] Database Connected");
  }
);

// Server Config
const host = process.env.API_HOST;
const port = process.env.API_PORT;

// Middlewares

// middleware for logging petitions
app.use((req, res, next) => {
  console.log("[Log] " + req.method + " " + req.path + " from: " + req.ip);
  next();
});

// Require routes
const authRoutes = require("./src/api/routes/auth.js");
const catalogRoutes = require("./src/api/routes/catalog.js");
// const bookshelfRoutes = require('./src/api/routes/bookshelf.js');

// Routes

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to ReadAgain API, please login");
});

app.use("/api/auth", authRoutes);

app.use("/api/", catalogRoutes);

// Server
app.listen(port);
console.log(`[+] Server running at http://${host}:${port}/`);
