const express = require("express");
const bodyParser = require("body-parser");
const conectar = require('./conexion');
const app = express();  
const cors = require("cors");

// para que la consola nos reconozca peticiones json
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
// analizar solicitudes de tipo: application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "<h1> Bienvenidos chavosssss prueba </h1>" });
});

//Routes
require("./routes/providers.routes")(app);
require("./routes/brand.routes")(app);
require("./routes/product_category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/lot.routes")(app);
require("./routes/inventory.routes")(app);
require("./routes/purchase_header.routes")(app);
require("./routes/purchase_detail.routes")(app);
require("./routes/customers.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/employee_position.routes")(app);
require("./routes/bill_header.routes")(app);
require("./routes/bill_detail.routes")(app); 
require("./routes/procedure_purchase.routes")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});