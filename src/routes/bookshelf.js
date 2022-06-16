const express = require("express");
const router = express.Router();

router.get("/bookshelf/get/:user", (req, res) => {
  res.send("Bookshelf Example");
});

router.get("/api/bookshelf/get/:user", (req, res) => {
  res.send("Bookshelf Example");
});

router.post("/api/bookshelf/:id/add", (req, res) => {
  res.send("Book Added");
});

router.patch("/api/bookshelf/:id/update", (req, res) => {
  res.send("Book Updated");
});

router.delete("/api/bookshelf/:id/delete", (req, res) => {
  res.send("Book Deleted");
});

module.exports = router
