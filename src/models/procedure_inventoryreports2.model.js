const sql = require("../conexion");

const Procedure_InventoryReport2 = function (procedure_inventoryreport2) {
  this.Date1 = procedure_inventoryreport2.Date1;
  this.Date2 = procedure_inventoryreport2.Date2;
  this.ProductId = procedure_inventoryreport2.ProductId;
};

Procedure_InventoryReport2.create = (newInventoryReport2, result) => {

  sql.query("CALL InventoryReport2(?,?,?);",
    [newInventoryReport2.Date1, newInventoryReport2.Date2, newInventoryReport2.ProductId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Inventory: ", { ...res });
      result(null, { ...res });
    });
};
module.exports = Procedure_InventoryReport2;