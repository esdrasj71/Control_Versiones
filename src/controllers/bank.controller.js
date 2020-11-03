const Bank = require("../models/bank.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create bank
  const bank = new Bank({ 
    Bank_Name: req.body.Bank_Name
  });

  // Save bank
  Bank.create(bank, (err, data) => {
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
    //Get all brank data
    Bank.getAll((err, data) => {
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
    //We obtain the bank with its id
    Bank.findById(req.params.bankId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el banco") {
          res.status(404).send({
            message: `Banco con ID no encontrado ${req.params.bankId}.`
          });
        } else {
          res.status(500).send({
            message: "Banco con ID encontrado" + req.params.bankId
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
    //update bank with your id
    Bank.updateById(
      req.params.bankId,
      new Bank(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el banco a actualizar") {
            res.status(404).send({
              message: `Banco con ID no encontrado ${req.params.bankId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando marca con ID " + req.params.bankId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Bank.remove(req.params.bankId, (err, data) => {
      if (err) {
        if (err.kind === "El banco a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Banco con ID no encontrada ${req.params.bankId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar banco con ID " + req.params.bankId
          });
        }
      } else res.send({ message: `Banco eliminado exitosamente` });
    });
  };