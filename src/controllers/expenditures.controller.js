const Expenditures = require("../models/expenditures.model.js")
//SAVE
exports.create = (req, res) => {
    //Validate the request
    if (!req.body) {
        res.status(400).send({
            message: "Campos vacios"
        });
    }
    // Create expenditures
    const expenditures = new Expenditures({
        Date: req.body.Date,
        Amount: req.body.Amount,
        Bill_Type_Id: req.body.Bill_Type_Id,
        No_Bill: req.body.No_Bill,
        Cheque: req.body.Cheque,
        No_Cheque: req.body.No_Cheque,
        Expenses_Id: req.body.Expenses_Id,
        Cost_Id: req.body.Cost_Id,
        Bank_Id: req.body.Bank_Id,
        Providers_Id: req.body.Providers_Id,
    });

    // Save expenditures
    Expenditures.create(expenditures, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all expenditures data
    Expenditures.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error"
            });
        else res.send(data);
    });
};
//GET ONE
exports.findOne = (req, res) => {
    //We obtain the expenditures with its id
    Expenditures.findById(req.params.expendituresId, (err, data) => {
        if (err) {
            if (err.kind === "No se ha encontrado el egreso") {
                res.status(404).send({
                    message: `Egreso con ID no encontrado ${req.params.expendituresId}.`
                });
            } else {
                res.status(500).send({
                    message: "Egreso con ID encontrado" + req.params.ExpendituresId
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
    //update expenditures with your id
    Expenditures.updateById(
        req.params.expendituresId,
        new Expenditures(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No se ha encontrado el egreso a actualizar") {
                    res.status(404).send({
                        message: `Egreso con ID no encontrado ${req.params.expendituresId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Actualizando egreso con ID " + req.params.expendituresId
                    });
                }
            } else res.send(data);
        }
    );
};
//DELETE
exports.delete = (req, res) => {
    Expenditures.remove(req.params.expendituresId, (err, data) => {
        if (err) {
            if (err.kind === "El egreso a eliminar no ha sido encontrado") {
                res.status(404).send({
                    message: `Egreso con ID no encontrado ${req.params.expendituresId}.`
                });
            } else {
                res.status(500).send({
                    message: "No se puede eliminar egreso con ID " + req.params.expendituresId
                });
            }
        } else res.send({ message: `Egreso eliminado exitosamente` });
    });
};