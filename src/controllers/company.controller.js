const Company = require("../models/company.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Viene Vacio"
    });
  }
  // Create Customer
  const company = new Company({
    Company_Name:req.body.Company_Name,
    Address:req.body.Address,
    NIT:req.body.NIT
  });

  // Save product
  Company.create(company, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  //Get all brand data
  Company.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio un error"
      });
    else res.send(data);
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
    Company.updateById(
      req.params.companyId,
      new Company(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No podemos encontrar la compañia para actualizar") {
            res.status(404).send({
              message: `Compañia con ID no encontrado: ${req.params.companyId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating company with id " + req.params.companyId
            });
          }
        } else res.send(data);
      }
    );
  };
