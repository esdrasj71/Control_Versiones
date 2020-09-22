const sql = require("./conexion");

// constructor
const Brand = function(brand) {
  this.name = brand.name;
  this.description = brand.description;
};

//CRUD
Brand.create = (newBrand, result) => {
  sql.query("INSERT INTO brand SET ?", newBrand, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created brand: ", { id: res.insertId, ...newBrand });
    result(null, { id: res.insertId, ...newBrand });
  });
};

Brand.findById = (brandId, result) => {
  sql.query(`SELECT * FROM brand WHERE id = ${brandId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found brand: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Brand with the id
    result({ kind: "not_found" }, null);
  });
};

Brand.getAll = result => {
  sql.query("SELECT * FROM brand", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("brands: ", res);
    result(null, res);
  });
};

Brand.updateById = (id, brand, result) => {
  sql.query(
    "UPDATE brand SET name = ?, description = ? WHERE id = ?",
    [brand.name, brand.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Brand with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated brand: ", { id: id, ...brand });
      result(null, { id: id, ...brand });
    }
  );
};

Brand.remove = (id, result) => {
  sql.query("DELETE FROM brand WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Brand with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted brand with id: ", id);
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

    console.log(`deleted ${res.affectedRows} brands`);
    result(null, res);
  });
};

module.exports = Brand;