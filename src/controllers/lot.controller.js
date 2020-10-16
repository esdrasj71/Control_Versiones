const Lot = require("../models/lot.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Create brand
  const lot = new Lot({
    Due_Date: req.body.Due_Date,
    Product_Id: req.body.Product_Id
  });

  // Save brand
  Lot.create(lot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all brand data
    Lot.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Lot.findById(req.params.Lot_Id, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the lot") {
          res.status(404).send({
            message: `Lote con ID no encontrado ${req.params.Lot_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Lote con ID no encontrado " + req.params.Lot_Id
          });
        }
      } else res.send(data);
    });
  };
//UPDATE
  exports.update = (req, res) => {
    // Validating request
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede ir vacio!"
      });
    }
    //update lot with your id
    Lot.updateById(
      req.params.Lot_Id,
      new Lot(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the lot to update") {
            res.status(404).send({
              message: `Lote con ID no encontrado ${req.params.Lot_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando lote con id " + req.params.Lot_Id
            });
          }
        } else res.send(data);
      }
    );
  };