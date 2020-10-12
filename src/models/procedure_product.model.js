const sql = require("../conexion");

const Procedure_SaveProduct = function (Procedure_SaveProduct) {
    this.Name = Procedure_SaveProduct.Name;
    this.Correlative_Product = Procedure_SaveProduct.Correlative_Product;
    this.Perishable = Procedure_SaveProduct.Perishable;
    this.Brand_Id = Procedure_SaveProduct.Brand_Id;
    this.Product_Category_Id = Procedure_SaveProduct.Product_Category_Id;
    this.Stock = Procedure_SaveProduct.Stock;
    this.Unit_Price = Procedure_SaveProduct.Unit_Price;
    this.Retail_Price = Procedure_SaveProduct.Retail_Price;
    this.Wholesale_Price = Procedure_SaveProduct.Wholesale_Price;
    this.Status = Procedure_SaveProduct.Status;
    this.Lot_Id = Procedure_SaveProduct.Lot_Id;
    this.Due_Date = Procedure_SaveProduct.Due_Date;
    this.Product_Id = Procedure_SaveProduct.Product_Id;
};

Procedure_SaveProduct.create = (newSaveProduct, result) => {
    sql.query("CALL SaveProduct(?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [newSaveProduct.Name, newSaveProduct.Correlative_Product, newSaveProduct.Perishable, newSaveProduct.Brand_Id, newSaveProduct.Product_Category_Id, newSaveProduct.Stock, newSaveProduct.Unit_Price, newSaveProduct.Retail_Price, newSaveProduct.Wholesale_Price, newSaveProduct.Status, newSaveProduct.Lot_Id, newSaveProduct.Due_Date, newSaveProduct.Product_Id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Procedimiento almacenado ha sido registrado correctamente!: ", { ...newSaveProduct });
            result(null, { ...newSaveProduct });
        });
};


module.exports = Procedure_SaveProduct;