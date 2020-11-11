const Series = require("../models/serie.model.js");

exports.create = (req, res) => {
    //Validate the request
    if (!req.body) {
      res.status(400).send({
        message: "COMES EMPTY"
      });
    }
    // Create provider
    const series = new Series({
      Nombre: req.body.Nombre,
      Cantidad_inicial: req.body.Cantidad_inicial,
      Cantidad_limite: req.body.Cantidad_limite
    });
  
    // Save provider
    Series.create(series, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error has occurred!"
        });
      else res.send(data);
    });
  };
  //GET ALL
exports.findAll = (req, res) => {
    //Get all supplier data
    Series.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error has occurred!"
        });
      else res.send(data);
    });
  };