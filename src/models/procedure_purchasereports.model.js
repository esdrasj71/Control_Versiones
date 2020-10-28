const sql = require("../conexion");

const Procedure_PurchaseReport1 = function (procedure_purchasereport1) {
    this.Date1 = procedure_purchasereport1.Date1;
    this.Date2 = procedure_purchasereport1.Date2;
};

Procedure_PurchaseReport1.create = (newPurchaseReport1, result) => {

sql.query("CALL PurchaseReport1(?,?);",
[newPurchaseReport1.Date1, newPurchaseReport1.Date2 ], (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Purchase: ", res);
      result(null, res);
    });

};
//Detalle Reporte 1
Procedure_PurchaseReport1.detail = (providersId, result) => {
    sql.query(`Select a.Purchase_Header_Id, b.Providers_Id, b.Fiscal_Name, b.NIT, a.Correlative_Number, a.Date_Purchase, a.Total
	from purchase_header as a 
	inner join providers as b on a.Providers_Id = b.Providers_Id 
	where b.Providers_Id = ${providersId}  
	order by a.Date_Purchase desc`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proveedor encontrado: ", res);
        result(null, res);
        return;
      }
      // not found Provider with the id
      result({ kind: "no encontrado" }, null);
    });
  };
module.exports = Procedure_PurchaseReport1;