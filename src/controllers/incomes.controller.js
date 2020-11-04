const procedure_incomes = require("../models/incomes.model.js");
exports.getAll = (req, res) => {
    //Get all supplier data
    procedure_incomes.getingresos((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error"
        });
      else res.send(data);
    });
  };

  exports.create = (req, res) => {
    //Validate the request
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    // Create Product
    const incomes = new procedure_incomes({
        Branch_Office1: req.body.Branch_Office1,
        Branch_Office2: req.body.Branch_Office2,
        Branch_Office3: req.body.Branch_Office3,
        Income_Date: req.body.Income_Date,
        Total: req.body.Total
    });
    // Save product
    procedure_incomes.create(incomes, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido un error!"
            });
        else res.send(data);
    });
};

exports.finAll = (req,res)=>{
  procedure_incomes.getALL((err,data)=>{
    if(err)
      res.status(500).send({
        message: err.message || "Ha ocurrido un error"
      });
      else res.send(data);
  })
}
exports.finEmpresa = (req,res)=>{
  procedure_incomes.getEmpresa((err,data)=>{
    if(err)
      res.status(500).send({
        message: err.message || "Ha ocurrido un error"
      });
      else res.send(data);
  })
}

exports.update = (req, res) => {
  // Validating request
  if (!req.body) {
      res.status(400).send({
          message: "El contenido no puede estar vacio!"
      });
  }
  //update product with your id
  procedure_incomes.updateById(
      req.params.Income_Date,
      new procedure_incomes(req.body),
      (err, data) => {
          if (err) {
              if (err.kind === "We can't find the product to update") {
                  res.status(404).send({
                      message: `Ingreso del mes no encontrado ${req.params.Income_Date}.`
                  });
              } else {
                  res.status(500).send({
                      message: "Ingreso del mes no encontrado " + req.params.Income_Date
                  });
              }
          } else res.send(data);
      }
  );
};
