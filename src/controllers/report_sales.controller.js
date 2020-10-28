const Report_Sales = require("../models/report_sales.model")



exports.Reporte3 = (req, res) => {
    Report_Sales.getReport3((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);

    })
}

exports.Reporte2 = (req, res) => {
    //We obtain the brand with its id
    Report_Sales.getReport2(req.params.fechainicio,req.params.fechafin, (err, data) => {
        if (err) {
            if (err.kind === "No se ha encontrado el Encabezado de factura") {
                res.status(404).send({
                    message: `Reporte no encontrado ${req.params.fechainicio}. ,${req.params.fechafin}.`
                });
            } else {
                res.status(500).send({
                    message: "Encabezado de factura con ID encontrada" + req.params.fechainicio + req.params.fechafin
                });
            }
        } else res.send(data);
    });
};