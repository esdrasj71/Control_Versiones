const Product_Category = require("../models/product_category.model.js");
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY"
    });
  }
  // Create product category
  const product_category = new Product_Category({
    name: req.body.name,
    description: req.body.description
  });

  // Save product category
  Product_Category.create(product_category, (err, data) => {
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
    //Get all product category data
    Product_Category.getAll((err, data) => {
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
    //We obtain the product category with its id
    Product_Category.findById(req.params.product_categoryId, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the product category") {
          res.status(404).send({
            message: `Product Category with id not found ${req.params.product_categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Product Category with id not found " + req.params.product_categoryId
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
    //update product category with your id
    Product_Category.updateById(
      req.params.product_categoryId,
      new Product_Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the product category to update") {
            res.status(404).send({
              message: `Product Category with id not found ${req.params.product_categoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating Product Category with id " + req.params.product_categoryId
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
        if (err.kind === "The Product Category you want to remove was not found") {
          res.status(404).send({
            message: `Product Category with id not found ${req.params.product_categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not remove product category with id" + req.params.product_categoryId
          });
        }
      } else res.send({ message: `Product category has been successfully removed!` });
    });
  };