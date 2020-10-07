const Payment_Purchase = require("../models/payment_purchase.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create brand
  const payment_purchase = new Payment_Purchase({ 
    Method_Name: req.body.Method_Name
  });

  // Save brand
  Payment_Purchase.create(payment_purchase, (err, data) => {
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
    Payment_Purchase.getAll((err, data) => {
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
    Payment_Purchase.findById(req.params.Payment_Purchase_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el compra de pago") {
          res.status(404).send({
            message: `Compra de pago con ID no encontrada ${req.params.Payment_Purchase_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Compra de pago con ID encontrada" + req.params.Payment_Purchase_Id
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
    Payment_Purchase.updateById(
      req.params.Payment_Purchase_Id,
      new Payment_Purchase(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el compra de pago a a actualizar") {
            res.status(404).send({
              message: `Compra de pago con ID no encontrada ${req.params.Payment_Purchase_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando compra de pago con ID " + req.params.Payment_Purchase_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Payment_Purchase.remove(req.params.Payment_Purchase_Id, (err, data) => {
      if (err) {
        if (err.kind === "Compra de pago a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Compra de pago con ID no encontrada ${req.params.Payment_Purchase_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar compra de pago con ID " + req.params.Payment_Purchase_Id
          });
        }
      } else res.send({ message: `Compra de pago eliminada exitosamente` });
    });
  };