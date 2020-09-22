const Providers = require("../models/providers.model.js")
//GUARDAR
exports.create = (req, res) => {
  //Validar la peticion
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Crear proveedor
  const providers = new Providers({
    nit: req.body.nit,
    fiscal_name: req.body.fiscal_name,
    phone_number1:req.body.phone_number1,
    phone_number2:req.body.phone_number2,
    email:req.body.email,
    address:req.body.address
  });

  // Guardar proveedores en la base de datos
  Providers.create(providers, (err, data) => {
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
    //Obtenemos todos los datos del proveedor
    Providers.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Se encontro un error."
        });
      else res.send(data);
    });
  };
//OBTENEMOS UNO
  exports.findOne = (req, res) => {
    //Obtenemos el proveedor con su id
    Providers.findById(req.params.providersId, (err, data) => {
      if (err) {
        if (err.kind === "no hemos encontrado al proveedor") {
          res.status(404).send({
            message: `No se encontro al proveedor con el id ${req.params.providersId}.`
          });
        } else {
          res.status(500).send({
            message: "No se encontro el proveedor con el id " + req.params.providersId
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
    //acutalizamos proveedor con su id
    Providers.updateById(
      req.params.providersId,
      new Providers(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No encontramos el proveedor para actualizar") {
            res.status(404).send({
              message: `No se encontro el proveedor con el id ${req.params.providersId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando proveedor con el id " + req.params.providersId
            });
          }
        } else res.send(data);
      }
    );
  };
//ELIMINAR
  exports.delete = (req, res) => {
    Providers.remove(req.params.providersId, (err, data) => {
      if (err) {
        if (err.kind === "No se encontro al proveedor que desea eliminar") {
          res.status(404).send({
            message: `No se encontro el proveedor con el id ${req.params.providersId}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo eliminar el proveedor con el id" + req.params.providersId
          });
        }
      } else res.send({ message: `Se ha eliminado correctamente el proveedor!` });
    });
  };