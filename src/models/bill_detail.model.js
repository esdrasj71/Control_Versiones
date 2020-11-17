const sql = require("../conexion.js");

// constructor
const Bill_Detail = function(bill_detail) {
  this.Subtotal = bill_detail.Subtotal;
  this.Quantity = bill_detail.Quantity;
  this.Price = bill_detail.Price;
  this.Bill_header_Id = bill_detail.Bill_header_Id;
  this.Inventory_Id = bill_detail.Inventory_Id;
};

//CRUD
Bill_Detail.create = (newBill, result) => {
  sql.query("INSERT INTO Bill_Detail SET ?", newBill, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Detalle de factura creada: ", { id: res.insertId, ...newBill });
    result(null, { id: res.insertId, ...newBill });
  });
};

Bill_Detail.findById = (Bill_Detail_Id, result) => {
  sql.query(`SELECT * FROM Bill_Detail WHERE Bill_Detail_Id = ${Bill_Detail_Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Detalle de factura encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "Detalle de factura no encontrada" }, null);
  });
};

Bill_Detail.getAll = result => {
  sql.query("SELECT * FROM Bill_Detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Detalle de factura: ", res);
    result(null, res);
  });
};

Bill_Detail.updateById = (id, bill_detail, result) => {
  sql.query(
    "UPDATE Bill_Detail SET Subtotal = ?, Quantity = ?, Price = ?, Bill_header_Id = ?, Inventory_Id = ? WHERE Bill_Detail_Id = ?",
    [bill_detail.Subtotal, bill_detail.Quantity, bill_detail.Price, bill_detail.Bill_header_Id, bill_detail.Inventory_Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "Detalle de factura no encontrada" }, null);
        return;
      }

      console.log("Detalle de factura actualizada: ", { id: id, ...bill_detail });
      result(null, { id: id, ...bill_detail });
    }
  );
};

Bill_Detail.remove = (id, result) => {
  sql.query("DELETE FROM Bill_Detail WHERE Bill_Detail_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Detalle de factura no encontrada" }, null);
      return;
    }

    console.log("Detalle de factura eliminada con ID: ", id);
    result(null, res);
  });
};

module.exports = Bill_Detail;