const sql = require("../conexion");

const Procedure_DebstoPay = function (Procedure_DebstoPay) {
    this.Providers_Id = Procedure_DebstoPay.Providers_Id;
    this.Quantity = Procedure_DebstoPay.Quantity;
    this.Description = Procedure_DebstoPay.Description;
};

Procedure_DebstoPay.create = (newSaveDebs, result) => {
    sql.query("CALL debstopayprocedure(?,?,?);",
        [newSaveDebs.Providers_Id, newSaveDebs.Quantity, newSaveDebs.Description], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Procedimiento almacenado ha sido registrado correctamente!: ", { ...newSaveDebs });
            result(null, { ...newSaveDebs });
        });
};


module.exports = Procedure_DebstoPay;