const Customers = require("../models/customers.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Viene Vacio"
    });
  }
  // Create Customer
  const customers = new Customers({
    DPI : req.body.DPI,
    Names: req.body.Names,
    Last_names: req.body.Last_names,
    NIT:req.body.NIT,
    Address:req.body.Address
  });

  // Save product
  Customers.create(customers, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all client data
    Customers.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the client with its id
    Customers.findById(req.params.Customers_Id, (err, data) => {
      if (err) {
        if (err.kind === "No se pudo encontrar el Cliente") {
          res.status(404).send({
            message: `Cliente con ID no encontrado: ${req.params.Customers_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Cliente con ID no encontrado: " + req.params.Customers_Id
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
        message: "The content cannot go empty!"
      });
    }
    //update product with your id
    Customers.updateById(
      req.params.Customers_Id,
      new Customers(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No podemos encontrar el cliente para actualizar") {
            res.status(404).send({
              message: `Cliente con ID no encontrado: ${req.params.Customers_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Updating product with id " + req.params.Customers_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Customers.remove(req.params.Customers_Id, (err, data) => {
      if (err) {
        if (err.kind === "El cliente que desea eliminar No se ha encontrado") {
          res.status(404).send({
            message: `Cliente con ID no encontrado ${req.params.Customers_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo eliminar cliente con ID" + req.params.Customers_Id
          });
        }
      } else res.send({ message: `Cliente eliminado exitosamente!` });
    });
  };