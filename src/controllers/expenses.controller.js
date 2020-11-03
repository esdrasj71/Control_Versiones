const Expenses = require("../models/expenses.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create 
  const expenses = new Expenses({ 
    Name: req.body.Name
  });

  // Save 
  Expenses.create(expenses, (err, data) => {
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
    Expenses.getAll((err, data) => {
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
    Expenses.findById(req.params.expensesId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el Expenses") {
          res.status(404).send({
            message: `Expenses con ID no encontrado ${req.params.expensesId}.`
          });
        } else {
          res.status(500).send({
            message: "Expenses con ID encontrado" + req.params.expensesId
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
    //update Expenses with your id
    Expenses.updateById(
      req.params.expensesId,
      new Expenses(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el Expenses a actualizar") {
            res.status(404).send({
              message: `Expenses con ID no encontrado ${req.params.expensesId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando con ID " + req.params.expensesId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Expenses.remove(req.params.expensesId, (err, data) => {
      if (err) {
        if (err.kind === "El Expenses eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Expenses con ID no encontrada ${req.params.expensesId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar Expenses con ID " + req.params.expensesId
          });
        }
      } else res.send({ message: `eliminado exitosamente` });
    });
  };