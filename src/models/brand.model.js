const sql = require("../conexion.js");

// constructor
const Brand = function(brand) {
  this.Name = brand.Name;
};

//CRUD
Brand.create = (newBrand, result) => {
  sql.query("INSERT INTO Brand SET ?", newBrand, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Marca creada: ", { id: res.insertId, ...newBrand });
    result(null, { id: res.insertId, ...newBrand });
  });
};

Brand.findById = (brandId, result) => {
  sql.query(`SELECT * FROM Brand WHERE Brand_Id = ${brandId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Marca encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Brand with the id
    result({ kind: "Marca no encontrada" }, null);
  });
};

Brand.getAll = result => {
  sql.query("SELECT * FROM Brand ORDER BY Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Marcas: ", res);
    result(null, res);
  });
};

Brand.updateById = (id, brand, result) => {
  sql.query(
    "UPDATE Brand SET Name = ? WHERE Brand_id = ?",
    [brand.Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Brand with the id
        result({ kind: "Marca no encontrada" }, null);
        return;
      }

      console.log("Marca actualizada: ", { id: id, ...brand });
      result(null, { id: id, ...brand });
    }
  );
};

Brand.remove = (id, result) => {
  sql.query("DELETE FROM Brand WHERE Brand_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Brand with the id
      result({ kind: "Marca no encontrada" }, null);
      return;
    }

    console.log("Marca eliminada con ID: ", id);
    result(null, res);
  });
};

Brand.removeAll = result => {
  sql.query("DELETE FROM Brand", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Marcas ${res.affectedRows} Eliminadas`);
    result(null, res);
  });
};

module.exports = Brand;