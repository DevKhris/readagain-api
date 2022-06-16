const cookieParser = require("cookie-parser");
const express = require("express");
const http = require('http')

const app = express();

http.createServer(  app)

app.use(express.urlencoded());
app.use(express.json())
app.use(cookieParser());

// Database Config
// mongoose.Promise = global.Promise;
// mongoose.connect(
//   db.DATABASE,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   },
//   function (err, conn) {
//     if (err) console.log(`[Error]: ${err}`);
//     console.log("[+] Database Connected");
//   }
// );


// middleware for logging petitions
app.use((req, res, next) => {
  console.log("[Log] " + req.method + " " + req.path + " from: " + req.ip);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to ReadAgain API, please login");
});


module.exports = app