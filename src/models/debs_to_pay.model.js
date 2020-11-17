const sql = require("../conexion.js");

// constructor
const Debs_To_Pay = function(debs_to_pay) {
  this.Quantity = debs_to_pay.Quantity;
  this.Total = debs_to_pay.Total;
  this.Statuss = debs_to_pay.Statuss;
  this.Description = debs_to_pay.Description;
  this.Purchase_Header_Id = debs_to_pay.Purchase_Header_Id;
};

Debs_To_Pay.create = (newDebstoPay, result) => {
  sql.query("INSERT INTO Debs_to_Pay SET ?", newDebstoPay, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Cuenta por pagar creada: ", { id: res.insertId, ...newDebstoPay });
    result(null, { id: res.insertId, ...newDebstoPay });
  });
};

Debs_To_Pay.findByIdDebs = (providersId, result) => {
  sql.query(`SELECT a.Debs_to_Pay_Id, b.Purchase_Header_Id, p.Providers_Id, p.Fiscal_Name, b.Correlative_Number, b.Serie, b.Date_Purchase, a.Total- a.Quantity
  as Pay, b.Total FROM Debs_to_Pay as a inner join Purchase_Header as b on a.Purchase_Header_Id = b.Purchase_header_Id 
  inner join Providers as p on b.Providers_Id = p.Providers_Id 
  where a.Statuss = 1 and p.Providers_Id =  ${providersId}`, (err, res) => {
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
  sql.query("SELECT a.Debs_to_Pay_Id,p.Providers_Id, b.Purchase_Header_Id,p.Fiscal_Name, p.NIT, p.Phone_Number1, SUM(a.Total - a.Quantity) as Pay FROM Debs_to_Pay as a inner join Purchase_Header as b on a.Purchase_Header_Id = b.Purchase_header_Id  inner join Providers as p on b.Providers_Id = p.Providers_Id where a.Statuss = 1 group by p.Fiscal_Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Proveedores a pagar: ", res);
    result(null, res);
  });
};
//Total
Debs_To_Pay.getTotal = result => {
  sql.query("SELECT SUM(Total-Quantity) as Total from Debs_to_Pay", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Proveedores a pagar: ", res);
    result(null, res);
  });
};

Debs_To_Pay.findByIdPurchase = (purchaseheaderId, result) => {
  sql.query(`SELECT a.Purchase_Header_Id, a.Correlative_Number, concat(e.Name,', ', f.Name, ', ',g.Name) as ProductComplete ,c.Lot_Id, b.Quantity, b.Unit_Price, b.SubTotal
    from Purchase_Header as a inner join Purchase_Detail as b on a.Purchase_Header_Id = b.Purchase_Header_Id
    inner join Inventory as c on c.Inventory_Id = b.Inventory_Id
    inner join Lot as d on d.Lot_Id = c.Lot_Id
    inner join Product as e on e.Product_Id = d.Product_Id
    inner join Brand as f on e.Brand_Id = f.Brand_Id
    inner join Product_Category as g on e.Product_Category_Id = g.Product_Category_Id 
    where a.Purchase_Header_Id = ${purchaseheaderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Encabezado de compra encontrado: ", res);
      result(null, res);
      return;
    }
    // not found Provider with the id
    result({ kind: "no encontrado" }, null);
  });
};

module.exports = Debs_To_Pay;