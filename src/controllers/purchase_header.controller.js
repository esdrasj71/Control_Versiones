const purchase_header = require("../models/purchase_header.model.js")

exports.create = (req, res) => {
  //Validar la peticion
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Crear purchase_header
  const Purchase_Header = new purchase_header({
    Correlative_Number: req.body.Correlative_Number,
    Serie: req.body.Serie,
    Date_Purchase: req.body.Date_Purchase,
    Total: req.body.Total,
    Refund:req.body.Refund,
    Annulment_State:req.body.Annulment_State,
    Observations:req.body.Observations,
    Providers_Id:req.body.Providers_Id
  });

  // Guardar encabezado de compra en la base de datos
  purchase_header.create(Purchase_Header, (err, data) => {
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
    //Obtenemos todos los datos de encabezado de compra
    purchase_header.getAll((err, data) => {
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
    purchase_header.findById(req.params.Purchase_Header_Id, (err, data) => {
      if (err) {
        if (err.kind === "no hemos encontrado el encabezado de compra") {
          res.status(404).send({
            message: `No se encontro el encabezado de compra con el id ${req.params.Purchase_Header_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se encontro el encabezado de compra con el id " + req.params.Purchase_Header_Id
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
    purchase_header.updateById(
      req.params.Purchase_Header_Id,
      new purchase_header(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No encontramos el encabezado de compra para actualizar") {
            res.status(404).send({
              message: `No se encontro el encabezado de compra con el id ${req.params.Purchase_Header_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando encabezado de compra con el id " + req.params.Purchase_Header_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//ELIMINAR
  exports.delete = (req, res) => {
    purchase_header.remove(req.params.Purchase_Header_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se encontro el encabezado de compra que desea eliminar") {
          res.status(404).send({
            message: `No se encontro el encabezado de compra con el id ${req.params.Purchase_Header_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo eliminar el encabezado de compra con el id" + req.params.Purchase_Header_Id
          });
        }
      } else res.send({ message: `Se ha eliminado correctamente el encabezado de compra!` });
    });
  };