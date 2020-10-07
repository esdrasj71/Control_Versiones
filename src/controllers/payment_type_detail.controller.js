const Payment_Type_Detail = require("../models/payment_type_detail.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  const payment_type_detail = new Payment_Type_Detail({ 
    Total_Amount: req.body.Total_Amount,
    Description: req.body.Description,
    Payment_Id: req.body.Payment_Id,
    Bill_Header_Id: req.body.Bill_Header_Id
  });

  // Save payment type detail
  Payment_Type_Detail.create(payment_type_detail, (err, data) => {
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
    Payment_Type_Detail.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error"
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Payment_Type_Detail.findById(req.params.Type_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el detalle tipo de pago") {
          res.status(404).send({
            message: `Detalle tipo de pago con ID no encontrada ${req.params.Type_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Detalle tipo de pago con ID encontrada" + req.params.Type_Detail_Id
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
    Payment_Type_Detail.updateById(
      req.params.Type_Detail_Id,
      new Payment_Type_Detail(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el detalle tipo de pago a a actualizar") {
            res.status(404).send({
              message: `Detalle tipo de pago con ID no encontrada ${req.params.Type_Detail_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando detalle tipo de pago con ID " + req.params.Type_Detail_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Payment_Type_Detail.remove(req.params.Type_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "Detalle tipo de pago a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Detalle tipo de pago con ID no encontrada ${req.params.Type_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar detalle tipo de pago con ID " + req.params.Type_Detail_Id
          });
        }
      } else res.send({ message: `Detalle tipo de pago eliminada exitosamente` });
    });
  };