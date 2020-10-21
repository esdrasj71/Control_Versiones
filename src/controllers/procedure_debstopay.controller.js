const procedure_savedebs = require("../models/procedure_debstopay.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_SaveDebs = new procedure_savedebs({
        Providers_Id: req.body.Providers_Id,
        Quantity: req.body.Quantity,
    });

    procedure_savedebs.create(Procedure_SaveDebs, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};