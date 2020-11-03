const Costs = require("../models/costs.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create 
  const costs = new Costs({ 
    Name: req.body.Name
  });

  // Save 
  Costs.create(costs, (err, data) => {
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
    Costs.getAll((err, data) => {
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
    Costs.findById(req.params.costsId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el costo") {
          res.status(404).send({
            message: `Costo con ID no encontrado ${req.params.costsId}.`
          });
        } else {
          res.status(500).send({
            message: "Costs con ID encontrado" + req.params.costsId
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
    //update costos with your id
    Costs.updateById(
      req.params.costsId,
      new Costs(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el Costo a actualizar") {
            res.status(404).send({
              message: `Costo con ID no encontrado ${req.params.costsId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando con ID " + req.params.costsId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Costs.remove(req.params.costsId, (err, data) => {
      if (err) {
        if (err.kind === "El costo eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Costo con ID no encontrada ${req.params.costsId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar costs con ID " + req.params.costsId
          });
        }
      } else res.send({ message: `eliminado exitosamente` });
    });
  };