const Product = require("../models/product.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY"
    });
  }
  // Create Product
  const product = new Product({
    Name: req.body.Name,
    Perishable: req.body.Perishable,
    Correlative_Product: req.body.Correlative_Product,
    Brand_Id: req.body.Brand_Id,
    Product_Category_Id: req.body.Product_Category_Id,
  });

  // Save product
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all supplier data
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the product with its id
    Product.findById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el producto") {
          res.status(404).send({
            message: `Producto no encontrado con ID ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Producto no encontrado con ID " + req.params.productId
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
    //update product with your id
    Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el producto a actualizar") {
            res.status(404).send({
              message: `Producto no encontrado con ID ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando el producto con ID " + req.params.productId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Product.remove(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "El producto que se quiere eliminar no ha sido encontrado") {
          res.status(404).send({
            message: `Producto no encontrado con ID ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar el producto con ID" + req.params.productId
          });
        }
      } else res.send({ message: `Producto eliminado exitosamente` });
    });
  };