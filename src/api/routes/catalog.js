const express = require("express");
const router = express.Router();

router.get("/api/bookshelf/get/:user", (req, res) => {
  res.send("Bookshelf Example");
});

router.get("/api/catalog", (req, res) => {
  Catalog.find({}, function (err, catalog) {
    res.status(200).send(catalog);
  });
});

module.exports = router;
