const sql = require("../conexion.js");

// constructor
const Product = function(product) {
  this.Name = product.Name;
  this.Perishable = product.Perishable;
  this.Correlative_Product = product.Correlative_Product;
  this.Brand_Id = product.Brand_Id;
  this.Product_Category_Id = product.Product_Category_Id;
};

//CRUD
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Producto creado: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM product WHERE product_id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Producto encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "no encontrado" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Productos: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET Name = ?, Perishable = ?, Correlative_Product = ?, Brand_Id = ?, Product_Category_Id = ? WHERE Product_Id = ?",
    [product.Name, product.Perishable, product.Correlative_Product, product.Brand_Id, product.Product_Category_Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "no encontrado" }, null);
        return;
      }
      console.log("Producto actualizado: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE product_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "no encontrado" }, null);
      return;
    }

    console.log("Producto eliminado con ID: ", id);
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

    console.log(`Productos ${res.affectedRows} eliminados`);
    result(null, res);
  });
};

module.exports = Product;