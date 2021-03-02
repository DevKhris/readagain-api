const Catalog = require("./../models/catalog");

exports.index = function (req, res) {
  Catalog.find({}, function (err, catalog) {
    if (err) return res.status(400).send(err);
    res.status(200).send(catalog);
  });
};
