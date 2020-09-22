const sql = require("./conexion");

// constructor
const Product = function(product) {
  this.name = product.name;
  this.description = product.description;
  this.unit_price = product.unit_price;
  this.retail_price = product.retail_price;
  this.wholesaler_price = product.wholesaler_price;
  this.perishable = product.perishable;
  this.due_date = product.due_date;
  this.creation_date = product.creation_date;
  this.product_category_id = product.product_category_id;
  this.brand_id = product.brand_id;
};

//CRUD
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM product WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET name = ?, description = ?, unit_price = ?, retail_price = ?, wholesaler_price = ?, perishable = ?, due_date = ?, creation_date = ?, product_category_id = ?, brand_id = ? WHERE id = ?",
    [product.name, product.description, product.unit_price, product.retail_price, product.wholesaler_price, product.perishable, product.perishable, product.due_date, product.creation_date, product.product_category_id, product.brand_id ,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;