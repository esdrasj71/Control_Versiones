const Inventory = require("../models/inventory.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Create Product
  const inventory = new Inventory({
    Stock: req.body.Stock,
    Unit_Price:req.body.Unit_Price,
    Retail_Price:req.body.Retail_Price,
    Wholesale_Price:req.body.Wholesale_Price,
    Lot_Id: req.body.Lot_Id,
    Status: req.body.Status,
  });

  // Save product
  Inventory.create(inventory, (err, data) => {
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
    //Get all supplier data
    Inventory.getAll((err, data) => {
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
    //We obtain the product with its id
    Inventory.findById(req.params.Inventory_Id, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the product") {
          res.status(404).send({
            message: `Inventario con ID no encontrado ${req.params.Inventory_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Inventario con ID no encontrado " + req.params.Inventory_Id
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
        message: "El contenido no puede estar vacio!"
      });
    }
    //update product with your id
    Inventory.updateById(
      req.params.Inventory_Id,
      new Inventory(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the product to update") {
            res.status(404).send({
              message: `Inventario con ID no encontrado ${req.params.Inventory_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Inventario con ID no encontrado " + req.params.Inventory_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Inventory.remove(req.params.Inventory_Id, (err, data) => {
      if (err) {
        if (err.kind === "The product you want to remove was not found") {
          res.status(404).send({
            message: `Inventario con ID no encontrado ${req.params.Inventory_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo eliminar el inventario " + req.params.Inventory_Id
          });
        }
      } else res.send({ message: `Inventario eliminado exitosamente!` });
    });
  };