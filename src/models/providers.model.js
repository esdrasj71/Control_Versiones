const sql = require("../conexion.js");

// constructor
const Providers = function(providers) {
  this.NIT = providers.NIT;
  this.Fiscal_Name= providers.Fiscal_Name;
  this.Phone_Number1=providers.Phone_Number1;
  this.Phone_Number2=providers.Phone_Number2;
  this.Email=providers.Email;
  this.Address=providers.Address;
};
//CRUD
Providers.create = (newProviders, result) => {
    sql.query("INSERT INTO Providers SET ?", newProviders, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created provider: ", { id: res.insertId, ...newProviders });
      result(null, { id: res.insertId, ...newProviders });
    });
  };

  Providers.findById = (providersId, result) => {
    sql.query(`SELECT * FROM Providers WHERE Providers_Id = ${providersId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found provider: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Provider with the id
      result({ kind: "not_found" }, null);
    });
  };

  Providers.getAll = result => {
    sql.query("SELECT * FROM Providers ORDER BY Fiscal_Name ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Providers: ", res);
      result(null, res);
    });
  };

  Providers.updateById = (id, providers, result) => {
    sql.query(
      "UPDATE Providers SET NIT = ?, Fiscal_Name = ?, Phone_Number1 = ?, Phone_Number2 = ?, Email = ?, Address = ? WHERE Providers_Id = ?",
      [providers.NIT, providers.Fiscal_Name, providers.Phone_Number1,providers.Phone_Number2, providers.Email, providers.Address, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Provider with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated provider: ", { id: id, ...providers });
        result(null, { id: id, ...providers });
      }
    );
  };

  Providers.remove = (id, result) => {
    sql.query("DELETE FROM Providers WHERE Providers_Id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // No se encontro el proveedor a eliminar
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted provider: ", id);
      result(null, res);
    });
  };
 
  module.exports = Providers;