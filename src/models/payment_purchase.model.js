const sql = require("../conexion.js");

// constructor
const Payment_Purchase = function(payment_purchase) {
  this.Method_Name = payment_purchase.Method_Name;
};

//CRUD
Payment_Purchase.create = (newPayment, result) => {
  sql.query("INSERT INTO payment_purchase SET ?", newPayment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Compra de pago creada: ", { id: res.insertId, ...newPayment });
    result(null, { id: res.insertId, ...newPayment });
  });
};

Payment_Purchase.findById = (PaymentId, result) => {
  sql.query(`SELECT * FROM payment_purchase WHERE Payment_Purchase_Id = ${PaymentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Compra de pago encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Payment purchase with the id
    result({ kind: "Compra de pago no encontrada" }, null);
  });
};

Payment_Purchase.getAll = result => {
  sql.query("SELECT * FROM payment_purchase", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Compra de pago: ", res);
    result(null, res);
  });
};

Payment_Purchase.updateById = (id, payment, result) => {
  sql.query(
    "UPDATE payment_purchase SET Method_Name = ? WHERE Payment_Purchase_Id = ?",
    [payment.Method_Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Brand with the id
        result({ kind: "Compra de pago no encontrada" }, null);
        return;
      }

      console.log("Compra de pago actualizada: ", { id: id, ...payment });
      result(null, { id: id, ...payment });
    }
  );
};

Payment_Purchase.remove = (id, result) => {
  sql.query("DELETE FROM payment_purchase WHERE Payment_Purchase_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Compra de pago no encontrada" }, null);
      return;
    }

    console.log("Compra de pago eliminada con ID: ", id);
    result(null, res);
  });
};

module.exports = Payment_Purchase;