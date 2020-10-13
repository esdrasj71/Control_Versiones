const sql = require("../conexion");

const Procedure_SaveLot = function (Procedure_SaveLot) {
    this.Due_Date = Procedure_SaveLot.Due_Date;
    this.Product_Id = Procedure_SaveLot.Product_Id;
};

Procedure_SaveLot.create = (newSaveLot, result) => {
    sql.query("CALL SaveLot(?,?);",
        [newSaveLot.Due_Date, newSaveLot.Product_Id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Procedimiento almacenado ha sido registrado correctamente!: ", { ...newSaveLot });
            result(null, { ...newSaveLot });
        });
};


module.exports = Procedure_SaveLot;