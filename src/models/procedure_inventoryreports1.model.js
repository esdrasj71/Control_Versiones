const sql = require("../conexion");

const Procedure_InventoryReport1 = function (procedure_inventoryreport1) {
  this.Date1 = procedure_inventoryreport1.Date1;
  this.Date2 = procedure_inventoryreport1.Date2;
};

Procedure_InventoryReport1.create = (newInventoryReport1, result) => {

  sql.query("CALL InventoryReport1(?,?);",
    [newInventoryReport1.Date1, newInventoryReport1.Date2], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Inventory: ", { ...res });
      result(null, { ...res });
    });

};

module.exports = Procedure_InventoryReport1;