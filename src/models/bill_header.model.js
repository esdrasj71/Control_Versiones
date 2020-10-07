const sql = require("../conexion.js");

// constructor
const Bill_Header = function(bill_header) {
  this.Correlative_Number = bill_header.Correlative_Number;
  this.Serie = bill_header.Serie;
  this.Date = bill_header.Date;
  this.Total = bill_header.Total;
  this.Refund = bill_header.Refund;
  this.Annulment_State = bill_header.Annulment_State;
  this.Payment_Complete = bill_header.Payment_Complete;
  this.Customers_Id = bill_header.Customers_Id;
  this.Employee_Id = bill_header.Employee_Id;
};

//CRUD
Bill_Header.create = (newBill, result) => {
  sql.query("INSERT INTO bill_header SET ?", newBill, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Encabezado de factura creada: ", { id: res.insertId, ...newBill });
    result(null, { id: res.insertId, ...newBill });
  });
};

Bill_Header.findById = (Bill_Header_Id, result) => {
  sql.query(`SELECT * FROM bill_header WHERE Bill_header_Id = ${Bill_Header_Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Encabezado de factura encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "Encabezado de factura no encontrada" }, null);
  });
};

Bill_Header.getAll = result => {
  sql.query("SELECT * FROM bill_header", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Encabezado de factura: ", res);
    result(null, res);
  });
};

Bill_Header.updateById = (id, bill_header, result) => {
  sql.query(
    "UPDATE bill_header SET Correlative_Number = ?, Serie = ?, Date = ?, Total = ?, Refund = ?, Annulment_State = ?, Payment_Complete = ?,Customers_Id = ?, Employee_Id = ? WHERE Bill_Header_Id = ?",
    [bill_header.Correlative_Number, bill_header.Serie, bill_header.Date, bill_header.Total, bill_header.Refund, bill_header.Annulment_State, bill_header.Payment_Complete, bill_header.Customers_Id, bill_header.Employee_Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "Encabezado de factura no encontrada" }, null);
        return;
      }

      console.log("Encabezado de factura actualizada: ", { id: id, ...bill_header });
      result(null, { id: id, ...bill_header });
    }
  );
};

Bill_Header.remove = (id, result) => {
  sql.query("DELETE FROM bill_header WHERE Bill_header_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Encabezado de factura no encontrada" }, null);
      return;
    }

    console.log("Encabezado de factura eliminada con ID: ", id);
    result(null, res);
  });
};

module.exports = Bill_Header;