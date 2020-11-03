const Bill_Type = require("../models/bill_type.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create 
  const bill_type = new Bill_Type({ 
    Name: req.body.Name
  });

  // Save 
  Bill_Type.create(bill_type, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio un error"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all data
    Bill_Type.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the  with its id
    Bill_Type.findById(req.params.billtypeId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el bill") {
          res.status(404).send({
            message: `Bill con ID no encontrado ${req.params.billtypeId}.`
          });
        } else {
          res.status(500).send({
            message: "Bill con ID encontrado" + req.params.billtypeId
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
        message: "El contenido no puede ir vacio"
      });
    }
    //update bill with your id
    Bill_Type.updateById(
      req.params.billtypeId,
      new Bill_Type(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el bill a actualizar") {
            res.status(404).send({
              message: `Bill con ID no encontrado ${req.params.billtypeId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando con ID " + req.params.billtypeId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Bill_Type.remove(req.params.billtypeId, (err, data) => {
      if (err) {
        if (err.kind === "El bill eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Bill con ID no encontrada ${req.params.billtypeId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar bill con ID " + req.params.billtypeId
          });
        }
      } else res.send({ message: `eliminado exitosamente` });
    });
  };