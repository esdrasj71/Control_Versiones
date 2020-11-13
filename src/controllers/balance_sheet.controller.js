const Balance_Sheet = require("../models/balance_sheet.model");
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const balance_sheet = new Balance_Sheet({
        fechafin: req.body.fechafin
    });

    Balance_Sheet.getbalance(balance_sheet, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};

