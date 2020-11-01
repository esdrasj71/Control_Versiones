const procedure_inventoryreport1 = require("../models/procedure_inventoryreports1.model");
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_InventoryReport1 = new procedure_inventoryreport1({
        Date1: req.body.Date1,
        Date2: req.body.Date2
    });

    procedure_inventoryreport1.create(Procedure_InventoryReport1, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};
