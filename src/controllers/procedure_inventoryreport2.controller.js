const procedure_inventoryreport2 = require("../models/procedure_inventoryreports2.model");
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_InventoryReport2 = new procedure_inventoryreport2({
        Date1: req.body.Date1,
        Date2: req.body.Date2,
        ProductId: req.body.ProductId
    });

    procedure_inventoryreport2.create(Procedure_InventoryReport2, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};