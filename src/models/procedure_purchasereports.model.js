const sql = require("../conexion");

const Procedure_PurchaseReport1 = function (procedure_purchasereport1) {
  this.Date1 = procedure_purchasereport1.Date1;
  this.Date2 = procedure_purchasereport1.Date2;
};

Procedure_PurchaseReport1.create = (newPurchaseReport1, result) => {

  sql.query("CALL PurchaseReport1(?,?);",
    [newPurchaseReport1.Date1, newPurchaseReport1.Date2], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Purchase: ", { ...res });
      result(null, { ...res });
    });

};

//Detalle Reporte 2
Procedure_PurchaseReport1.detaildebs = (result) => {
  sql.query('SELECT a.Debs_to_Pay_Id,p.Providers_Id, b.Purchase_Header_Id,p.Fiscal_Name, p.NIT, p.Phone_Number1, SUM(a.Total - a.Quantity) as Pay, COUNT(*) as Debs FROM Debs_to_Pay as a inner join Purchase_Header as b on a.Purchase_Header_Id = b.Purchase_header_Id inner join Providers as p on b.Providers_Id = p.Providers_Id where a.Statuss = 1 group by p.Fiscal_Name', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Cuenta por pagar encontrada: ", res);
      result(null, res);
      return;
    }
    // not found Provider with the id
    result({ kind: "no encontrado" }, null);
  });
};

module.exports = Procedure_PurchaseReport1;