const sql = require("../conexion.js");
const Report_Sales = function(report_sales) {
    this.fechainicio = report_sales.fechainicio;
    this.fechafin = report_sales.fechafin;

};
//Generete NoFactura Bill_Header
Report_Sales.getReport3 = result => {
    sql.query("SELECT c.NIT, CONCAT(C.Names,' ',C.Last_names) AS Names , c.Phone_Number ,SUM(a.Total - a.Quantity) as Total, c.Customers_Id, COUNT(*) as NoFacturas FROM accounts_receivable as a INNER JOIN bill_header as b on b.Bill_header_Id = a.Bill_header_Id INNER JOIN customers as c on c.Customers_Id = b.Customers_Id WHERE b.Payment_Complete = 0 GROUP by c.Names ORDER by Total DESC;", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            result;
        }
        console.log("Reporte 3 creado: ", res);
        result(null, res);
    })
}
Report_Sales.getReport2 = (newReport, result) => {
    console.log(newReport);
    sql.query(`SELECT CONCAT(c.Names," " ,c.Last_names) as Names, c.DPI, c.NIT, c.Phone_Number, c.Address ,COUNT(*) AS NoVentas, 
    SUM(bh.Total) as Total from bill_header as bh INNER JOIN customers as c on c.Customers_Id = bh.Customers_Id  WHERE bh.Date BETWEEN 
    (?) AND (?) GROUP BY C.Customers_Id  
    ORDER BY Total  DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Reporte 2 encontrado: ", res);
            result(null, res);
            return;
        }

        result({ kind: "Reporte 2 no encontrado" }, null);
    });
};
module.exports = Report_Sales;