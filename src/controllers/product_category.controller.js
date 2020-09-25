const Product_Category = require("../models/product_category.model.js");
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create product category
  const product_category = new Product_Category({
    name: req.body.name
  });

  // Save product category
  Product_Category.create(product_category, (err, data) => {
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
    //Get all product category data
    Product_Category.getAll((err, data) => {
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
    //We obtain the product category with its id
    Product_Category.findById(req.params.product_categoryId, (err, data) => {
      if (err) {
        if (err.kind === "Categoria de producto no encontrada") {
          res.status(404).send({
            message: `Categoria de producto no encontrada con ID ${req.params.product_categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Categoria de producto no encontrada con ID " + req.params.product_categoryId
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
    //update product category with your id
    Product_Category.updateById(
      req.params.product_categoryId,
      new Product_Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado la categoria de producto a actualizar") {
            res.status(404).send({
              message: `Categoria de producto no encontrada con ID ${req.params.product_categoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Categoria de producto actualizada con ID " + req.params.product_categoryId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Product_Category.remove(req.params.product_categoryId, (err, data) => {
      if (err) {
        if (err.kind === "La categoria de producto a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Categoria de producto no encontrada con ID ${req.params.product_categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar la categoria de producto con ID" + req.params.product_categoryId
          });
        }
      } else res.send({ message: `Categoria de producto eliminada exitosamente` });
    });
  };