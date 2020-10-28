const Report_Sales = require("../models/report_sales.model")

exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const report_sales = new Report_Sales({
        fechainicio: req.body.fechainicio,
        fechafin: req.body.fechafin,
    });

    Report_Sales.getReport2(report_sales, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};

exports.Reporte3 = (req, res) => {
    Report_Sales.getReport3((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrio un error"
            });
        else res.send(data);

    })
}

