const sql = require("../conexion.js");

// constructor
const Bill_Type = function(bill_type) {
  this.Name = bill_type.Name;
};

//CRUD
Bill_Type.create = (newBill_Type, result) => {
  sql.query("INSERT INTO Bill_Type SET ?", newBill_Type, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("creado: ", { id: res.insertId, ...newBill_Type });
    result(null, { id: res.insertId, ...newBill_Type });
  });
};

Bill_Type.findById = (billtypeId, result) => {
  sql.query(`SELECT * FROM Bill_Type WHERE Bill_Type_Id = ${billtypeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found  with the id
    result({ kind: "no encontrado" }, null);
  });
};

Bill_Type.getAll = result => {
  sql.query("SELECT * FROM Bill_Type ORDER BY Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Bills: ", res);
    result(null, res);
  });
};

Bill_Type.updateById = (id, bill_type, result) => {
  sql.query(
    "UPDATE Bill_Type SET name = ? WHERE Bill_Type_Id = ?",
    [bill_type.Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found with the id
        result({ kind: "no encontrado" }, null);
        return;
      }

      console.log("actualizado: ", { id: id, ...bill_type });
      result(null, { id: id, ...bill_type });
    }
  );
};

Bill_Type.remove = (id, result) => {
  sql.query("DELETE FROM Bill_Type WHERE Bill_Type_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found with the id
      result({ kind: "No encontrado" }, null);
      return;
    }

    console.log("eliminado con ID: ", id);
    result(null, res);
  });
};

module.exports = Bill_Type;