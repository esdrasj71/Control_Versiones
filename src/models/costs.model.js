const sql = require("../conexion.js");

// constructor
const Costs = function(costs) {
  this.Name = costs.Name;
};

//CRUD
Costs.create = (newCosts, result) => {
  sql.query("INSERT INTO costs SET ?", newCosts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("creado: ", { id: res.insertId, ...newCosts });
    result(null, { id: res.insertId, ...newCosts });
  });
};

Costs.findById = (costsId, result) => {
  sql.query(`SELECT * FROM costs WHERE cost_id = ${costsId}`, (err, res) => {
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

Costs.getAll = result => {
  sql.query("SELECT * FROM costs ORDER BY Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Costs: ", res);
    result(null, res);
  });
};

Costs.updateById = (id, costs, result) => {
  sql.query(
    "UPDATE costs SET name = ? WHERE cost_id = ?",
    [costs.Name, id],
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

      console.log("actualizado: ", { id: id, ...costs });
      result(null, { id: id, ...costs });
    }
  );
};

Costs.remove = (id, result) => {
  sql.query("DELETE FROM costs WHERE cost_id = ?", id, (err, res) => {
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

module.exports = Costs;