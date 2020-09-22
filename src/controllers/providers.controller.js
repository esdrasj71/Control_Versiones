const Providers = require("../models/providers.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY"
    });
  }
  // Create provider
  const providers = new Providers({
    nit: req.body.nit,
    fiscal_name: req.body.fiscal_name,
    phone_number1:req.body.phone_number1,
    phone_number2:req.body.phone_number2,
    email:req.body.email,
    address:req.body.address
  });

  // Save provider
  Providers.create(providers, (err, data) => {
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
    Providers.getAll((err, data) => {
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
    //We obtain the provider with its id
    Providers.findById(req.params.providersId, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the supplier") {
          res.status(404).send({
            message: `Provider with id not found ${req.params.providersId}.`
          });
        } else {
          res.status(500).send({
            message: "Provider with id not found " + req.params.providersId
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
    //update provider with your id
    Providers.updateById(
      req.params.providersId,
      new Providers(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the provider to update") {
            res.status(404).send({
              message: `Provider with id not found ${req.params.providersId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating provider with id " + req.params.providersId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Providers.remove(req.params.providersId, (err, data) => {
      if (err) {
        if (err.kind === "The provider you want to remove was not found") {
          res.status(404).send({
            message: `Provider with id not found ${req.params.providersId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not remove provider with id" + req.params.providersId
          });
        }
      } else res.send({ message: `Provider has been successfully removed!` });
    });
  };