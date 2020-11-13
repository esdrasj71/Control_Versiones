const Balance_Sheet = require("../models/balance_detail.model");
exports.createBalance = (req, res) => {
    //Validar la peticion
    if (!req.body) {
        res.status(400).send({
            message: "VIENE VACIO"
        });
    }
    let fecha = new Date();
    const insert_balance = new Balance_Sheet({
        
        Amount:req.body.Monto,
        Date: fecha,
        Balance_Id: req.body.Balance_Id,
     
    });

    Balance_Sheet.create(insert_balance, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error!"
            });
        else res.send(data);
    });
};