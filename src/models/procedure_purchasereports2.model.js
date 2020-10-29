const sql = require("../conexion");

const Procedure_PurchaseReport2 = function (procedure_purchasereport2) {
  this.Date1 = procedure_purchasereport2.Date1;
  this.Date2 = procedure_purchasereport2.Date2;
  this.ProvidersId = procedure_purchasereport2.ProvidersId;
};

Procedure_PurchaseReport2.create = (newPurchaseReport2, result) => {

  sql.query("CALL PurchaseReport2(?,?,?);",
    [newPurchaseReport2.Date1, newPurchaseReport2.Date2, newPurchaseReport2.ProvidersId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Purchase: ", { ...res });
      result(null, { ...res });
    });
};
module.exports = Procedure_PurchaseReport2;