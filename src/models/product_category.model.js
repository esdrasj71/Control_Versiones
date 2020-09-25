const sql = require("../conexion.js");

// constructor
const Product_Category = function(product_category) {
  this.Name = product_category.Name;
};

Product_Category.create = (newProduct_Category, result) => {
  sql.query("INSERT INTO product_category SET ?", newProduct_Category, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Categoria de producto creada: ", { id: res.insertId, ...newProduct_Category });
    result(null, { id: res.insertId, ...newProduct_Category });
  });
};

Product_Category.findById = (product_categoryId, result) => {
  sql.query(`SELECT * FROM product_category WHERE product_category_id = ${product_categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Categoria de producto creada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product Category with the id
    result({ kind: "no encontrada" }, null);
  });
};

Product_Category.getAll = result => {
  sql.query("SELECT * FROM product_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Categoria de productos: ", res);
    result(null, res);
  });
};

Product_Category.updateById = (id, product_category, result) => {
  sql.query(
    "UPDATE product_category SET name = ? WHERE product_category_id  = ?",
    [product_category.Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product category with the id
        result({ kind: "no encontrado" }, null);
        return;
      }

      console.log("Categoria de producto actualizado: ", { id: id, ...product_category });
      result(null, { id: id, ...product_category });
    }
  );
};

Product_Category.remove = (id, result) => {
  sql.query("DELETE FROM product_category WHERE product_category_id  = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product category with the id
      result({ kind: "no encontrado" }, null);
      return;
    }

    console.log("Categoria de producto eliminado con ID: ", id);
    result(null, res);
  });
};

Product_Category.removeAll = result => {
  sql.query("DELETE FROM product_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Categoria de productos ${res.affectedRows} eliminados`);
    result(null, res);
  });
};

module.exports = Product_Category;