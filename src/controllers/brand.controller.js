const Brand = require("../models/brand.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY"
    });
  }
  // Create brand
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description
  });

  // Save brand
  Brand.create(brand, (err, data) => {
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
    //Get all brand data
    Brand.getAll((err, data) => {
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
    //We obtain the brand with its id
    Brand.findById(req.params.brandId, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the brand") {
          res.status(404).send({
            message: `Brand with id not found ${req.params.brandId}.`
          });
        } else {
          res.status(500).send({
            message: "Brand with id not found " + req.params.brandId
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
    //update brand with your id
    Brand.updateById(
      req.params.brandId,
      new Brand(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the brand to update") {
            res.status(404).send({
              message: `Brand with id not found ${req.params.brandId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating brand with id " + req.params.brandId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Brand.remove(req.params.brandId, (err, data) => {
      if (err) {
        if (err.kind === "The brand you want to remove was not found") {
          res.status(404).send({
            message: `Brand with id not found ${req.params.brandId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not remove brand with id" + req.params.brandId
          });
        }
      } else res.send({ message: `Brand has been successfully removed!` });
    });
  };