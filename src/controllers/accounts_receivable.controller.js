const Accounts_Receivable = require("../models/accounts.model");

exports.create = (req, res) => {
    //Validate the request
    if (!req.body) {
        res.status(400).send({
            message: "Campos vacios"
        });
    }
    // Create cuentas por cobrar
    const accounts_receivable = new Accounts_Receivable({
        Quantity: req.body.Quantity,
        Total: req.body.Total,
        Statuss: req.body.Statuss,
        Bill_header_Id: req.body.Bill_header_Id
    });

    // Save cuentas por cobrar
    Accounts_Receivable.create(accounts_receivable, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};
//procedimiento almacenado para descontar facturas en cuentas por cobrar



//GET ALL
exports.findAll = (req, res) => {
    //Get all bill header data
    Accounts_Receivable.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};

//GET ONE
exports.getOne = (req, res) => {
    //We obtain the brand with its id
    Accounts_Receivable.getFacturas(req.params.Customers_Id, (err, data) => {
        if (err) {
            if (err.kind === "No se ha encontraron las facturas") {
                res.status(404).send({
                    message: `Factura no encontrada ${req.params.Customers_Id}.`
                });
            } else {
                res.status(500).send({
                    message: "Facturas encontradas" + req.params.Customers_Id
                });
            }
        } else res.send(data);
    });
};
//obtener detalle de la factura 
exports.getDetalle = (req, res) => {
    //We obtain the brand with its id
    Accounts_Receivable.getDetalleFactura(req.params.Bill_header_Id, (err, data) => {
        if (err) {
            if (err.kind === "No se ha encontraron las facturas") {
                res.status(404).send({
                    message: `Detalles no encontradas ${req.params.Bill_header_Id}.`
                });
            } else {
                res.status(500).send({
                    message: "Detalles encontradas" + req.params.Bill_header_Id
                });
            }
        } else res.send(data);
    });
};