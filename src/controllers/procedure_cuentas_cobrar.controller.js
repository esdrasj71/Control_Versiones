const procedure_cuentascobrar = require("../models/procedure_cuentas_cobrar.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_CuentasCobrar = new procedure_cuentascobrar({
        Customers_Id: req.body.Customers_Id,
        Quantity: req.body.Quantity,
        Description: req.body.Description,
        Payment_Id: req.body.Payment_Id,
    });

    procedure_cuentascobrar.create(Procedure_CuentasCobrar, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};