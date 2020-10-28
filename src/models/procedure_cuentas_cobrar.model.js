const sql = require("../conexion");

//procedimiento para descontar por facturas en las cuentas por cobrar
const Procedure_CuentasCobrar = function(Procedure_CuentasCobrar) {
    this.Customers_Id = Procedure_CuentasCobrar.Customers_Id;
    this.Quantity = Procedure_CuentasCobrar.Quantity;
    this.Description = Procedure_CuentasCobrar.Description;
    this.Payment_Id = Procedure_CuentasCobrar.Payment_Id;
    console.log(Procedure_CuentasCobrar);
};

Procedure_CuentasCobrar.create = (newCuenta, result) => {
    console.log(newCuenta);
    sql.query("CALL prueba1(?,?,?,?);", [newCuenta.Customers_Id, newCuenta.Quantity, newCuenta.Description, newCuenta.Payment_Id], (err, res) => {
        if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Procedimiento almacenado ha sido registrado correctamente!: ", {...newCuenta });
        result(null, {...newCuenta });
    });
};
module.exports = Procedure_CuentasCobrar;