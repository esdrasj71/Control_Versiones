const sql = require("../conexion");

// constructor
const Providers = function(providers) {
  this.nit = providers.nit;
  this.fiscal_name= providers.fiscal_name;
  this.phone_number1=providers.phone_number1;
  this.phone_number2=providers.phone_number2;
  this.email=providers.email;
  this.address=providers.address;
};
//DEFINICIONES CRUD
Providers.create = (newProviders, result) => {
    sql.query("INSERT INTO providers SET ?", newProviders, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Proveedor registrado correctamente!: ", { id: res.insertId, ...newProviders });
      result(null, { id: res.insertId, ...newProviders });
    });
  };

  Providers.findById = (providersId, result) => {
    sql.query(`SELECT * FROM providers WHERE id_providers = ${providersId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proveedor encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }
      // No se encontro el id del proveedor
      result({ kind: "no hemos encontrado al proveedor" }, null);
    });
  };

  Providers.getAll = result => {
    sql.query("SELECT * FROM providers", (err, res) => {
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
      "UPDATE providers SET nit = ?, fiscal_name = ?, phone_number1 = ?, phone_number2 = ?, email = ?, address = ? WHERE id_providers = ?",
      [providers.nit, providers.fiscal_name, providers.phone_number1,providers.phone_number2, providers.email, providers.address, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // No se encontro el proveedor para actualizar
          result({ kind: "No encontramos el proveedor para actualizar" }, null);
          return;
        }
  
        console.log("Proveedor actualizado: ", { id: id, ...providers });
        result(null, { id: id, ...providers });
      }
    );
  };

  Providers.remove = (id, result) => {
    sql.query("DELETE FROM providers WHERE id_providers = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // No se encontro el proveedor a eliminar
        result({ kind: "No se encontro al proveedor que desea eliminar" }, null);
        return;
      }
  
      console.log("Eliminando el proveedor: ", id);
      result(null, res);
    });
  };
  module.exports = Providers;