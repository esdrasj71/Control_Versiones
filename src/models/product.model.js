const sql = require("../conexion.js");

// constructor
const Product = function (product) {
  this.Name = product.Name;  
  this.Correlative_Product = product.Correlative_Product;
  this.Perishable = product.Perishable;
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

  sql.query("SELECT p.Product_Id, p.Product_Category_Id,p.Brand_Id, l.Lot_Id,p.Name, b.Name as Brand, pc.Name as Category, p.Perishable, p.Correlative_Product, concat(p.Name, ', ' ,b.Name, ', ', pc.Name) as Complete FROM product as p inner join Brand as b on p.Brand_Id = b.Brand_Id inner join Product_Category as pc on p.Product_Category_Id = pc.Product_Category_Id left join lot as l on l.product_id=p.product_id WHERE p.Correlative_Product = ? or p.Product_Id= ?",[productId,productId], (err, res) => {
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
  sql.query("SELECT p.Product_Id, p.Product_Category_Id,p.Brand_Id, p.Name, b.Name as Brand, pc.Name as Category, p.Perishable, p.Correlative_Product, l.Due_Date as DueDate, concat(p.Name, ', ' ,b.Name, ', ', pc.Name) as Complete, CASE p.Perishable WHEN 1 THEN 'Sí' WHEN 0 THEN 'No' END AS Perish FROM product as p inner join Brand as b on p.Brand_Id = b.Brand_Id inner join Product_Category as pc on p.Product_Category_Id = pc.Product_Category_Id left join lot as l on l.Product_Id = p.Product_Id GROUP BY p.Product_Id, p.Product_Category_Id,p.Brand_Id ORDER BY YEAR(DueDate) DESC, MONTH(DueDate) DESC, DAY(DueDate) ASC, p.Name ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Productos: ", res);
    result(null, res);
  });
};

//ProductLot
Product.getProductLot = result => {
  sql.query("SELECT p.Product_Id, p.Product_Category_Id,p.Brand_Id, p.Name, b.Name as Brand, pc.Name as Category, p.Perishable, p.Correlative_Product, l.Due_Date as DueDate, concat(p.Name, ', ' ,b.Name, ', ', pc.Name) as Complete, CASE p.Perishable WHEN 1 THEN 'Sí' WHEN 0 THEN 'No' END AS Perish FROM product as p inner join Brand as b on p.Brand_Id = b.Brand_Id inner join Product_Category as pc on p.Product_Category_Id = pc.Product_Category_Id left join lot as l on l.Product_Id = p.Product_Id  where p.Perishable = 1 GROUP BY p.Product_Id, p.Product_Category_Id,p.Brand_Id ORDER BY YEAR(DueDate) DESC, MONTH(DueDate) DESC, DAY(DueDate) ASC, p.Name ASC", (err, res) => {
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
    "UPDATE product SET Name = ?, Perishable = ?, Correlative_Product = ?, Brand_Id = ?, Product_Category_Id = ? WHERE Product_Id = ?", [product.Name, product.Perishable, product.Correlative_Product, product.Brand_Id, product.Product_Category_Id, id],
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
    } master
    console.log(`Productos ${res.affectedRows} eliminados`);
    result(null, res);
  });
};

module.exports = Product;

