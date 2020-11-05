const Estado_Result = require("../models/status_result.model");



exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    const estado_result = new Estado_Result({
        fechainicio: req.body.fechainicio,
        fechafin: req.body.fechafin,
    });

    Estado_Result.getEstadoResult(estado_result, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};