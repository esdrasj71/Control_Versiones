const procedure_purchasereport2 = require("../models/procedure_purchasereports2.model");
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_PurchaseReport2 = new procedure_purchasereport2({
        Date1: req.body.Date1,
        Date2: req.body.Date2,
        ProvidersId: req.body.ProvidersId
    });

    procedure_purchasereport2.create(Procedure_PurchaseReport2, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};