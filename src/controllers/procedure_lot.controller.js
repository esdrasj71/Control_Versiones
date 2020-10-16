const procedure_savelot = require("../models/procedure_lot.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_SaveLot = new procedure_savelot({
        Due_Date: req.body.Due_Date,
        Product_Id: req.body.Product_Id,
    });

    procedure_savelot.create(Procedure_SaveLot, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};