const sql = require("../conexion.js");
const Balance_Sheet = function(balance_sheet) {
    this.fechafin = balance_sheet.fechafin;
};
Balance_Sheet.getbalance = (newBalance, result) => {
    //console.log(newReport);

    sql.query("CALL balance_general(?);",
    [newBalance.fechafin], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Balance general correctamente: ", { ...res });
        result(null, { ...res });
       
    });
};

module.exports = Balance_Sheet;