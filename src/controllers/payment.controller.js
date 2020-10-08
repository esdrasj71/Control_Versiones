const Payment = require("../models/payment.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create payment
  const payment = new Payment({ 
    Method_Name: req.body.Method_Name
  });

  // Save brand
  Payment.create(payment, (err, data) => {
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
    Payment.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error"
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Payment.findById(req.params.Payment_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado la forma de pago") {
          res.status(404).send({
            message: `Forma de pago con ID no encontrada ${req.params.Payment_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Forma de pago con ID encontrada" + req.params.Payment_Id
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
    //update brand with your id
    Payment.updateById(
      req.params.Payment_Id,
      new Payment(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el forma de pago a actualizar") {
            res.status(404).send({
              message: `Forma de pago con ID no encontrada ${req.params.Payment_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando forma de pago con ID " + req.params.Payment_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Payment.remove(req.params.Payment_Id, (err, data) => {
      if (err) {
        if (err.kind === "Forma de pago a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Forma de pago con ID no encontrada ${req.params.Payment_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar forma de pago con ID " + req.params.Payment_Purchase_Id
          });
        }
      } else res.send({ message: `Forma de pago eliminada exitosamente` });
    });
  };