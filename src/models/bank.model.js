const sql = require("../conexion.js");

// constructor
const Bank = function(bank) {
  this.Bank_Name = bank.Bank_Name;
};

//CRUD
Bank.create = (newBank, result) => {
  sql.query("INSERT INTO Bank SET ?", newBank, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Banco creado: ", { id: res.insertId, ...newBank });
    result(null, { id: res.insertId, ...newBank });
  });
};

Bank.findById = (bankId, result) => {
  sql.query(`SELECT * FROM Bank WHERE Bank_id = ${bankId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Banco encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Bank with the id
    result({ kind: "Banco no encontrado" }, null);
  });
};

Bank.getAll = result => {
  sql.query("SELECT * FROM Bank ORDER BY Bank_Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Bancos: ", res);
    result(null, res);
  });
};

Bank.updateById = (id, bank, result) => {
  sql.query(
    "UPDATE Bank SET Bank_Name = ? WHERE Bank_id = ?",
    [bank.Bank_Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Bank with the id
        result({ kind: "Banco no encontrado" }, null);
        return;
      }

      console.log("Banco actualizado: ", { id: id, ...bank });
      result(null, { id: id, ...bank });
    }
  );
};

Bank.remove = (id, result) => {
  sql.query("DELETE FROM Bank WHERE Bank_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bank with the id
      result({ kind: "Banco no encontrado" }, null);
      return;
    }

    console.log("Banco eliminado con ID: ", id);
    result(null, res);
  });
};

Bank.removeAll = result => {
  sql.query("DELETE FROM Bank", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Bancos ${res.affectedRows} Eliminados`);
    result(null, res);
  });
};

module.exports = Bank;