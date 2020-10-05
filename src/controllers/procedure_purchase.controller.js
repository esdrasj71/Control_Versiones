const procedure_purchase = require("../models/procedure_purchase.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
      res.status(400).send({
        message: "VIENE VACIO"
      });
    }
    const Procedure_Purchase= new procedure_purchase({
      Quantity: req.body.Quantity,
      Unit_Price: req.body.Unit_Price,
      Subtotal: req.body.Subtotal,
      Inventory_Id:req.body.Inventory_Id
    });

    procedure_purchase.create(Procedure_Purchase, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Ha ocurrido algun error!"
          });
        else res.send(data);
      });
    };