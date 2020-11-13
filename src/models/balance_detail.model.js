const sql = require("../conexion.js");
const Insert_Balance = function(insert_balance){
    this.Amount = insert_balance.Amount;
    this.Date = insert_balance.Date;
    this.Balance_Id = insert_balance.Balance_Id;
}
Insert_Balance.create = (newBalanceDetalle, result) => {
    sql.query("INSERT INTO detail_balance_sheet SET ?", newBalanceDetalle, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, {estado: false});
            return;
        }
        console.log("Detalle de balance general insertada: ", { id: res.insertId, ...newBalanceDetalle, estado: true });
        result(null, { id: res.insertId, ...newBalanceDetalle, estado: true });
    });
};
module.exports = Insert_Balance;