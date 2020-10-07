const sql = require("../conexion.js");

// constructor
const Payment = function(payment) {
  this.Method_Name = payment.Method_Name;
};

//CRUD
Payment.create = (newPayment, result) => {
  sql.query("INSERT INTO payment SET ?", newPayment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Forma de pago creada: ", { id: res.insertId, ...newPayment });
    result(null, { id: res.insertId, ...newPayment });
  });
};

Payment.findById = (PaymentId, result) => {
  sql.query(`SELECT * FROM payment WHERE Payment_Id = ${PaymentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Forma de pago encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Payment purchase with the id
    result({ kind: "Forma de pago no encontrada" }, null);
  });
};

Payment.getAll = result => {
  sql.query("SELECT * FROM payment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Forma de pago: ", res);
    result(null, res);
  });
};

Payment.updateById = (id, payment, result) => {
  sql.query(
    "UPDATE payment SET Method_Name = ? WHERE Payment_Id = ?",
    [payment.Method_Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Payment with the id
        result({ kind: "Forma de pago no encontrada" }, null);
        return;
      }

      console.log("Forma de pago actualizada: ", { id: id, ...payment });
      result(null, { id: id, ...payment });
    }
  );
};

Payment.remove = (id, result) => {
  sql.query("DELETE FROM payment WHERE Payment_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Forma de pago no encontrada" }, null);
      return;
    }

    console.log("Forma de pago eliminada con ID: ", id);
    result(null, res);
  });
};

module.exports = Payment;