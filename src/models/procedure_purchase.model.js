const sql = require("../conexion");

const Procedure_Purchase = function (procedure_purchase) {
    this.Quantity = procedure_purchase.Quantity;
    this.Unit_Price = procedure_purchase.Unit_Price;
    this.Subtotal = procedure_purchase.Subtotal;
    this.Inventory_Id = procedure_purchase.Inventory_Id;
};

Procedure_Purchase.create = (newPurchase, result) => {

sql.query("CALL compra(?,?,?,?);",
[newPurchase.Inventory_Id, newPurchase.Quantity, newPurchase.Subtotal,newPurchase.Unit_Price], (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    console.log("Procedimiento almacenado ha sido registrado correctamente!: ", { ...newPurchase });
    result(null, { ...newPurchase });
});

};
module.exports = Procedure_Purchase;