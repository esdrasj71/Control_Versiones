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

