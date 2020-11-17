const sql = require("../conexion.js");

// constructor
const Payment_Detail_Purchase = function(payment_detail_purchase) {
  this.Method_Name = payment_detail_purchase.Method_Name;
  this.Total_Amount = payment_detail_purchase.Total_Amount;
  this.Description = payment_detail_purchase.Description;
  this.Purchase_Header_Id = payment_detail_purchase.Purchase_Header_Id;
};

//CRUD
Payment_Detail_Purchase.create = (newPurchaseD, result) => {
  sql.query("INSERT INTO Payment_Detail_Purchase SET ?", newPurchaseD, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Detalle compra de pago creado: ", { id: res.insertId, ...newPurchaseD });
    result(null, { id: res.insertId, ...newPurchaseD });
  });
};

Payment_Detail_Purchase.findById = (PaymentDetailId, result) => {
    sql.query(`SELECT * FROM Payment_Detail_Purchase WHERE Payment_Detail_Purchase_Id = ${PaymentDetailId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Detalle compra de pago encontrada: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Payment detail purchase with the id
      result({ kind: "Detalle compra de pago no encontrada" }, null);
    });
  };

  Payment_Detail_Purchase.getAll = result => {
    sql.query("SELECT * FROM Payment_Detail_Purchase", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Detalle compra de pago: ", res);
      result(null, res);
    });
  };

Payment_Detail_Purchase.updateById = (id, paymentDetail, result) => {
  sql.query(
"UPDATE Payment_Detail_Purchase SET Method_Name=?,Total_Amount = ?, Description = ?, Purchase_Header_Id = ? WHERE Payment_Detail_Purchase_Id = ?",
[paymentDetail.Method_Name,paymentDetail.Total_Amount, paymentDetail.Description, paymentDetail.Purchase_Header_Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no encontrado" }, null);
        return;
      }
      console.log("Detalle compra actualizado: ", { id: id, ...paymentDetail });
      result(null, { id: id, ...paymentDetail });
    }
  );
};

Payment_Detail_Purchase.remove = (id, result) => {
  sql.query("DELETE FROM Payment_Detail_Purchase WHERE Payment_Detail_Purchase_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "no encontrado" }, null);
      return;
    }

    console.log("Detalle compra de pago eliminado con ID: ", id);
    result(null, res);
  });
};

module.exports = Payment_Detail_Purchase;