const Bill_Detail = require("../models/bill_detail.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create Bill detail
  const bill_detail = new Bill_Detail({
    Subtotal: req.body.Subtotal,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Bill_header_Id: req.body.Bill_header_Id,
    Inventory_Id: req.body.Inventory_Id  
  });

  // Save bill detail
  Bill_Detail.create(bill_detail, (err, data) => {
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
    //Get all bill header data
    Bill_Detail.getAll((err, data) => {
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
    //We obtain the brand with its id
    Bill_Detail.findById(req.params.Bill_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el detalle de factura") {
          res.status(404).send({
            message: `Detalle de factura con ID no encontrada ${req.params.Bill_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Detalle de factura con ID encontrada" + req.params.Bill_Detail_Id
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
    //update detail with your id
    Bill_Detail.updateById(
      req.params.Bill_Detail_Id,
      new Bill_Detail(req.body),
      (err, data) => { 
        if (err) {
          if (err.kind === "No se ha encontrado el detalle de factura a actualizar") {
            res.status(404).send({
              message: `Detalle de factura con ID no encontrada ${req.params.Bill_Detail_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando detalle de factura con ID " + req.params.Bill_Detail_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Bill_Detail.remove(req.params.Bill_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "Los detalles a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Detalle de factura con ID no encontrada ${req.params.Bill_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar detalle de factura con ID " + req.params.Bill_Detail_Id
          });
        }
      } else res.send({ message: `Detalle de factura eliminada exitosamente` });
    });
  };