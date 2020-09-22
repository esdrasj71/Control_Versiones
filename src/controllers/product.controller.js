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
    name: req.body.name,
    description: req.body.description,
    unit_price:req.body.unit_price,
    retail_price:req.body.retail_price,
    wholesaler_price:req.body.wholesaler_price,
    perishable:req.body.perishable,
    due_date:req.body.due_date,
    creation_date:req.body.creation_date,
    product_category_id:req.body.product_category_id,
    brand_id: req.body.brand_id
  });

  // Save product
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error has occurred!"
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
            err.message || "An error has occurred!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the product with its id
    Product.findById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the product") {
          res.status(404).send({
            message: `Product with id not found ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Product with id not found " + req.params.productId
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
    Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the product to update") {
            res.status(404).send({
              message: `Product with id not found ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating product with id " + req.params.productId
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
        if (err.kind === "The product you want to remove was not found") {
          res.status(404).send({
            message: `Product with id not found ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not remove product with id" + req.params.productId
          });
        }
      } else res.send({ message: `Product has been successfully removed!` });
    });
  };