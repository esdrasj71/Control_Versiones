const purchase_detail = require("../models/purchase_detail.model.js")

exports.create = (req, res) => {
  //Validar la peticion
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Crear purchase_detail
  const Purchase_Detail = new purchase_detail({
    Quantity: req.body.Quantity,
    Unit_Price: req.body.Unit_Price,
    Subtotal: req.body.Subtotal,
    Purchase_Header_Id:req.body.Observations,
    Inventory_Id:req.body.Inventory_Id
  });

  // Guardar detalle de compra en la base de datos
  purchase_detail.create(Purchase_Detail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido algun error!"
      });
    else res.send(data);
  });
};
//OBTENER TODOS
exports.findAll = (req, res) => {
    //Obtenemos todos los datos de detalle de compra
    purchase_detail.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Se encontro un error."
        });
      else res.send(data);
    });
  };
//BUSCAR UNO
  exports.findOne = (req, res) => {
    purchase_detail.findById(req.params.Purchase_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "no hemos encontrado el detalle de compra") {
          res.status(404).send({
            message: `No se encontro el detalle de compra con el id ${req.params.Purchase_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se encontro el detalle de compra con el id " + req.params.Purchase_Detail_Id
          });
        }
      } else res.send(data);
    });
  };
//ACTUALIZAR
  exports.update = (req, res) => {
    // Validando peticion
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede ir vacio!"
      });
    }
    //acutalizamos encabezado de compra con su id
    purchase_detail.updateById(
      req.params.Purchase_Detail_Id,
      new purchase_detail(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No encontramos los detalles de compra para actualizar") {
            res.status(404).send({
              message: `No se encontro los detalles de compra con el id ${req.params.Purchase_Detail_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando detalle de compra con el id " + req.params.Purchase_Detail_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//ELIMINAR
  exports.delete = (req, res) => {
    purchase_detail.remove(req.params.Purchase_Detail_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se encontro detalle de compra que desea eliminar") {
          res.status(404).send({
            message: `No se encontro detalle de compra con el id ${req.params.Purchase_Detail_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo eliminar detalle de compra con el id" + req.params.Purchase_Detail_Id
          });
        }
      } else res.send({ message: `Se ha eliminado correctamente detalle de compra!` });
    });
  };