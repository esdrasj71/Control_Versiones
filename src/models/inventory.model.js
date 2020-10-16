const sql = require("../conexion.js");

// constructor
const Inventory = function(inventory) {
    this.Stock = inventory.Stock;
    this.Unit_Price = inventory.Unit_Price;
    this.Retail_Price = inventory.Retail_Price;
    this.Wholesale_Price = inventory.Wholesale_Price;
    this.Lot_Id = inventory.Lot_Id;
    this.Statuss = inventory.Statuss;
};

//CRUD
Inventory.create = (newInventory, result) => {
    sql.query("INSERT INTO inventory SET ?", newInventory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Inventario creado: ", { id: res.insertId, ...newInventory });
        result(null, { id: res.insertId, ...newInventory });
    });
};

Inventory.findById = (Inventario_Id, result) => {

    sql.query(`SELECT i.Inventory_Id, l.Lot_Id, pp.Correlative_Product as Correlative_Product, i.Stock, i.Unit_Price, i.Retail_Price, i.Wholesale_Price, i.Statuss,concat(pp.Name,', ',b.Name, ', ',pc.Name) as ProductComplete FROM inventory as i left join lot as l on i.Lot_Id = l.Lot_Id inner join  product as pp on l.Product_Id = pp.Product_Id inner join brand as b on pp.Brand_Id = b.Brand_Id inner join product_category as pc on pp.Product_Category_Id = pc.Product_Category_Id WHERE Inventory_Id = ${Inventario_Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Inventario encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Inventory with the id
        result({ kind: "no_encontrado" }, null);
    });
};

Inventory.getAll = result => {
    sql.query("SELECT i.Inventory_Id,l.Product_Id, l.Lot_Id, i.Lot_Id,pp.Correlative_Product as Correlative_Product ,pp.Name as Product, pp.Perishable, l.Due_Date as DueDate, i.Stock, i.Unit_Price, i.Retail_Price, i.Wholesale_Price, i.Statuss,concat(pp.Name,', ',b.Name, ', ',pc.Name) as ProductComplete FROM inventory as i left join lot as l on i.Lot_Id = l.Lot_Id inner join product as pp on pp.Product_Id = l.Product_Id inner join brand as b on pp.Brand_Id = b.Brand_Id inner join product_category as pc on pp.Product_Category_Id = pc.Product_Category_Id ORDER BY YEAR(DueDate) , MONTH(DueDate) , DAY(DueDate) , pp.Name ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("inventario: ", res);
        result(null, res);
    });
};
Inventory.updateById = (id, inventario, result) => {
    sql.query(
        "UPDATE inventory SET Stock = ?, Unit_Price = ?, Retail_Price = ?, Wholesale_Price = ?, Lot_Id = ?, Statuss = ? WHERE Inventory_Id = ?", [inventario.Stock, inventario.Unit_Price, inventario.Retail_Price, inventario.Wholesale_Price, inventario.Lot_Id, inventario.Statuss, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "no_encontrado" }, null);
                return;
            }

            console.log("Actualizar inventario: ", { id: id, ...inventario });
            result(null, { id: id, ...inventario });
        }
    );
};

Inventory.remove = (id, result) => {
    sql.query("DELETE FROM inventory WHERE Inventory_Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Product with the id
            result({ kind: "no_encontrado" }, null);
            return;
        }

        console.log("Inventario eliminado con ID: ", id);
        result(null, res);
    });
};

module.exports = Inventory;