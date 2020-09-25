const sql = require("../conexion.js");

// constructor
const Brand = function(brand) {
  this.name = brand.name;
};

//CRUD
Brand.create = (newBrand, result) => {
  sql.query("INSERT INTO brand SET ?", newBrand, (err, res) => {
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
  sql.query(`SELECT * FROM brand WHERE brand_id = ${brandId}`, (err, res) => {
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
  sql.query("SELECT * FROM brand", (err, res) => {
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
    "UPDATE brand SET name = ? WHERE brand_id = ?",
    [brand.name, id],
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
  sql.query("DELETE FROM brand WHERE brand_id = ?", id, (err, res) => {
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
  sql.query("DELETE FROM brand", (err, res) => {
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