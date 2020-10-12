const procedure_saveproduct = require("../models/procedure_product.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const Procedure_SaveProduct = new procedure_saveproduct({
        Name: req.body.Name,
        Correlative_Product: req.body.Correlative_Product,
        Perishable: req.body.Perishable,
        Brand_Id: req.body.Brand_Id,
        Product_Category_Id: req.body.Product_Category_Id,
        Statuss: req.body.Statuss,
        Due_Date: req.body.Due_Date
    });

    procedure_saveproduct.create(Procedure_SaveProduct, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};