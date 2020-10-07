const procedure_sales = require("../models/procedure_sales.model")
exports.create = (req, res) => {
    //Validar la peticion
    if (!req.body) {
      res.status(400).send({
        message: "VIENE VACIO"
      });
    }
    const Procedure_Sales = new procedure_sales({
      Subtotal: req.body.Subtotal,
      Quantity: req.body.Quantity,
      Price: req.body.Price,
      Inventory_Id: req.body.Inventory_Id,
    });

    procedure_sales.create(Procedure_Sales, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Ha ocurrido algun error!"
          });
        else res.send(data);
      });
    };