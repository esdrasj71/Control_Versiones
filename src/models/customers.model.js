const sql = require("../conexion.js");

// constructor
const Customers = function(customers) {
  this.DPI = customers.DPI;
  this.Names = customers.Names;
  this.Last_names = customers.Last_names;
  this.Phone_Number = customers.Phone_Number;
  this.NIT = customers.NIT;
  this.Direccion = customers.Direccion;
};

//CRUD
Customers.create = (newCustomers, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Cliente creado: ", { id: res.insertId, ...newCustomers });
    result(null, { id: res.insertId, ...newCustomers });
  });
};

Customers.findById = (customersId, result) => {
  sql.query(`SELECT * FROM customers WHERE Customers_Id = ${customersId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Cliente no encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Brand with the id
    result({ kind: "no_encontrado" }, null);
  });
};

Customers.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Cliente: ", res);
    result(null, res);
  });
};

Customers.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET DPI = ?, Names = ?, Last_Names = ?, Phone_Number = ?, NIT = ?, Direccion = ? WHERE Customers_Id = ?",
    [customer.DPI, customer.Names, customer.Last_names, customer.Phone_Number, customer.NIT, customer.Direccion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no_encontrado" }, null);
        return;
      }

      console.log("Cliente actualizado: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customers.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE Customers_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Brand with the id
      result({ kind: "no_encontrado" }, null);
      return;
    }

    console.log("Cliente eliminado con ID: ", id);
    result(null, res);
  });
};

module.exports = Customers;