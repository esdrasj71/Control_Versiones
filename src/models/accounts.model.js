const sql = require("../conexion.js");
const Accounts_Receivable = function(accounts_receivable) {
    this.Quantity = accounts_receivable.Quantity;
    this.Total = accounts_receivable.Total;
    this.Statuss = accounts_receivable.Statuss;
    this.Bill_header_Id = accounts_receivable.Bill_header_Id;
}
Accounts_Receivable.getAll = result => {
    sql.query("SELECT c.NIT, CONCAT(C.Names,' ',C.Last_names) AS Names , c.Phone_Number ,SUM(a.Total - a.Quantity) as Total, c.Customers_Id, COUNT(*) as NoFacturas FROM accounts_receivable as a INNER JOIN bill_header as b on b.Bill_header_Id = a.Bill_header_Id INNER JOIN customers as c on c.Customers_Id = b.Customers_Id WHERE b.Payment_Complete = 0 GROUP by c.Names ORDER by Total DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Cuentas por cobrar: ", res);
        result(null, res);
    });
};


Accounts_Receivable.getFacturas = (Customers_Id, result) => {
    sql.query(`SELECT b.Bill_header_Id, b.Correlative_Number,  s.Nombre as Serie, a.Total-a.Quantity as Total, b.Date FROM bill_header as b INNER JOIN accounts_receivable a on a.Bill_header_Id = b.Bill_header_Id INNER JOIN serie as s on s.Serie_Id = b.Serie_Id WHERE  a.Statuss != 0 and  b.Customers_Id  = ${Customers_Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Facturas encontradas: ", res);
            result(null, res);
            return;
        }
        result({ kind: "Facturas no encontradas" }, null);
    });
};

Accounts_Receivable.getDetalleFactura = (Bill_header_Id, result) => {
    sql.query(`SELECT p.Name, bd.Price, bd.Quantity, bd.Subtotal FROM bill_header as bh INNER JOIN bill_detail as bd on bh.Bill_header_Id = bd.Bill_header_Id INNER JOIN inventory as i on i.Inventory_Id = bd.Inventory_Id INNER JOIN lot as l on l.Lot_Id = i.Lot_Id INNER JOIN product as p on p.Product_Id = l.Product_Id WHERE bh.Bill_header_Id = ${Bill_header_Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Detalle de facturas  encontradas: ", res);
            result(null, res);
            return;
        }
        result({ kind: "Detalle de facturas no encontradas" }, null);
    });
};

Accounts_Receivable.create = (newAccount, result) => {
    sql.query("INSERT INTO accounts_receivable SET ?", newAccount, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Cuenta por cobrar insertada: ", { id: res.insertId, ...newAccount });
        result(null, { id: res.insertId, ...newAccount });
    });
};


module.exports = Accounts_Receivable;