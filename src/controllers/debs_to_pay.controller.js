const Debs_To_Pay = require("../models/debs_to_pay.model")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Viene Vacio"
    });
  }
  // Create Customer
  const debs_to_pay = new Debs_To_Pay({
    Quantity: req.body.Quantity,
    Total: req.body.Total,
    Statuss: req.body.Statuss,
    Description: req.body.Description,
    Purchase_Header_Id: req.body.Purchase_Header_Id,
  });
   // Save debs to pay
   Debs_To_Pay.create(debs_to_pay, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};

exports.findAllDebs = (req, res) => {
  Debs_To_Pay.getAllDebs((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};

exports.findOneDebs = (req, res) => {
  Debs_To_Pay.findByIdDebs(req.params.debstopayId, (err, data) => {
    if (err) {
      if (err.kind === "No se pudo encontrar el Proveedor") {
        res.status(404).send({
          message: `Proveedor con ID no encontrado: ${req.params.debstopayId}.`
        });
      } else {
        res.status(500).send({
          message: "Cliente con ID no encontrado: " + req.params.debstopayId
        });
      }
    } else res.send(data);
  });
};

exports.findOnePurchase = (req, res) => {
  Debs_To_Pay.findByIdPurchase(req.params.purchaseheaderId, (err, data) => {
    if (err) {
      if (err.kind === "No se pudo encontrar la Compra") {
        res.status(404).send({
          message: `Encabezado de compra con ID no encontrado: ${req.params.purchaseheaderId}.`
        });
      } else {
        res.status(500).send({
          message: "Encabezado de compra con ID no encontrado: " + req.params.purchaseheaderId
        });
      }
    } else res.send(data);
  });
};
