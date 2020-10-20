const sql = require("../conexion.js");

// constructor
const Debs_To_Pay = function(debs_to_pay) {
  this.Quantity = debs_to_pay.Quantity;
  this.Total = debs_to_pay.Total;
  this.Statuss = debs_to_pay.Statuss;
  this.Date = debs_to_pay.Date;
  this.Purchase_Header_Id = debs_to_pay.Purchase_Header_Id;
};
Debs_To_Pay.findByIdDebs = (providersId, result) => {
  sql.query(`SELECT p.Providers_ID, p.Fiscal_Name ,ph.Purchase_Header_Id, ph.Correlative_Number ,ph.Date_Purchase,ph.Payment_Complete, pp.Method_Name,  (pdp.Total_Amount) as Pagar 
  from providers as p inner join purchase_header as ph on p.Providers_Id = ph.Providers_Id
  inner join payment_detail_purchase as pdp on ph.Purchase_Header_Id = pdp.Purchase_Header_Id
  inner join payment_purchase as pp on pdp.Payment_Purchase_Id = pp.Payment_Purchase_Id
  Where pp.Method_Name like '%credito%' and ph.Payment_Complete = 1
  and p.Providers_Id =  ${providersId} order by ph.Date_Purchase asc`, (err, res) => {
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

Debs_To_Pay.getAllDebs = result => {
  sql.query("SELECT p.Fiscal_Name, p.NIT, p.Phone_Number1, ph.Purchase_Header_Id,ph.Payment_Complete, pp.Method_Name, SUM(pdp.Total_Amount) as Pay FROM purchase_header as ph inner join payment_detail_purchase as pdp on ph.Purchase_Header_Id = pdp.Purchase_Header_Id inner join payment_purchase as pp on pdp.Payment_Purchase_Id = pp.Payment_Purchase_Id inner join providers as p on ph.Providers_Id = p.Providers_Id Where pp.Method_Name like '%credito%' and ph.Payment_Complete = 1 group by p.Fiscal_Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Proveedores a pagar: ", res);
    result(null, res);
  });
};

module.exports = Debs_To_Pay;