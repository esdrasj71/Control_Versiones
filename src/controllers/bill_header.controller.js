const Bill_Header = require("../models/bill_header.model.js")
const proedure_sales = require("../models/procedure_sales.model")
    //SAVE
exports.create = (req, res) => {
    //Validate the request
    if (!req.body) {
        res.status(400).send({
            message: "Campos vacios"
        });
    }
    // Create Bill header
    const bill_header = new Bill_Header({
        Correlative_Number: req.body.Correlative_Number,
        Serie: req.body.Serie,
        Date: req.body.Date,
        Total: req.body.Total,
        Refund: req.body.Refund,
        Annulment_State: req.body.Annulment_State,
        Payment_Complete: req.body.Payment_Complete,
        Customers_Id: req.body.Customers_Id,
        Employee_Id: parseInt(req.body.Employee_Id)
    });
    const Procedure_Sales = new proedure_sales({
            Correlative_Number: req.body.Correlative_Number,
            Serie: req.body.Serie,
            Date: req.body.Date,
            Total: req.body.Total,
            Refund: req.body.Refund,
            Annulment_State: req.body.Annulment_State,
            Customers_Id: req.body.Customers_Id,
            Employee_Id: req.body.Employee_Id,
            Subtotal: req.body.Subtotal,
            Quantity: req.body.Quantity,
            Price: req.body.Price,
            Iventory_Id: req.body.Iventory_Id
        })
        // Save bill header
    Bill_Header.create(bill_header, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};

//Generate NoFactura bill header
exports.findNoFactura = (req, res) => {
    Bill_Header.getNoFactura((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);

    })
}

//GET ALL
exports.findAll = (req, res) => {
    //Get all bill header data
    Bill_Header.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};
//GET ONE
exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Bill_Header.findById(req.params.Bill_header_Id, (err, data) => {
        if (err) {
            if (err.kind === "No se ha encontrado el Encabezado de factura") {
                res.status(404).send({
                    message: `Encabezado de factura con ID no encontrada ${req.params.Bill_header_Id}.`
                });
            } else {
                res.status(500).send({
                    message: "Encabezado de factura con ID encontrada" + req.params.Bill_header_Id
                });
            }
        } else res.send(data);
    });
};
//UPDATE
exports.update = (req, res) => {
    // Validating request
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede ir vacio"
        });
    }
    //update brand with your id
    Bill_Header.updateById(
        req.params.Bill_header_Id,
        new Bill_Header(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No se ha encontrado el encabezado de factura a actualizar") {
                    res.status(404).send({
                        message: `Encabezado de factura con ID no encontrada ${req.params.Bill_header_Id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Actualizando encabezado de factura con ID " + req.params.Bill_header_Id
                    });
                }
            } else res.send(data);
        }
    );
};
//DELETE
exports.delete = (req, res) => {
    Bill_Header.remove(req.params.Bill_header_Id, (err, data) => {
        if (err) {
            if (err.kind === "La marca a eliminar no ha sido encontrada") {
                res.status(404).send({
                    message: `Encabezado de factura con ID no encontrada ${req.params.Bill_header_Id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se puede eliminar encabezado de factura con ID " + req.params.Bill_header_Id
                });
            }
        } else res.send({ message: `Encabezado de factura eliminada exitosamente` });
    });
};