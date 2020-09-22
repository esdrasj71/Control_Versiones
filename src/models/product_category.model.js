const sql = require("../conexion.js");

// constructor
const Product_Category = function(product_category) {
  this.name = product_category.name;
  this.description = product_category.description;
};

Product_Category.create = (newProduct_Category, result) => {
  sql.query("INSERT INTO product_category SET ?", newProduct_Category, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created product category: ", { id: res.insertId, ...newProduct_Category });
    result(null, { id: res.insertId, ...newProduct_Category });
  });
};

Product_Category.findById = (product_categoryId, result) => {
  sql.query(`SELECT * FROM product_category WHERE id = ${product_categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product Category with the id
    result({ kind: "not_found" }, null);
  });
};

Product_Category.getAll = result => {
  sql.query("SELECT * FROM product_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product categories: ", res);
    result(null, res);
  });
};

Product_Category.updateById = (id, product_category, result) => {
  sql.query(
    "UPDATE product_category SET name = ?, description = ? WHERE id = ?",
    [product_category.name, product_category.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product category: ", { id: id, ...product_category });
      result(null, { id: id, ...product_category });
    }
  );
};

Product_Category.remove = (id, result) => {
  sql.query("DELETE FROM product_category WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product category with id: ", id);
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

    console.log(`deleted ${res.affectedRows} product categories`);
    result(null, res);
  });
};

module.exports = Product_Category;