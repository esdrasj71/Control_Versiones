const Procedure_PurchaseReport1 = require("../models/procedure_purchasereports.model");
const procedure_purchasereport1 = require("../models/procedure_purchasereports.model")
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
//Detail
exports.detailreport1 = (req, res) => {
    Procedure_PurchaseReport1.detail(req.params.purchasereport1Id, (err, data) => {
      if (err) {
        if (err.kind === "No se pudo encontrar el Proveedor") {
          res.status(404).send({
            message: `Proveedor con ID no encontrado: ${req.params.purchasereport1Id}.`
          });
        } else {
          res.status(500).send({
            message: "Proveedor con ID no encontrado: " + req.params.purchasereport1Id
          });
        }
      } else res.send(data);
    });
  };