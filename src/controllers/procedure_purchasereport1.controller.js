const procedure_purchasereport1 = require("../models/procedure_purchasereports.model");
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_PurchaseReport1 = new procedure_purchasereport1({
        Date1: req.body.Date1,
        Date2: req.body.Date2
    });

    procedure_purchasereport1.create(Procedure_PurchaseReport1, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};

//Detail 2
exports.detaildebs = (req, res) => {
  procedure_purchasereport1.detaildebs((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error"
      });
    else res.send(data);
  });
};