const express = require("express");
const bodyParser = require("body-parser");
const conectar = require('./conexion');
const app = express();  

// para que la consola nos reconozca peticiones json
app.use(bodyParser.json());

// analizar solicitudes de tipo: application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "<h1> Bienvenidos chavosssss prueba </h1>" });
});

require("./routes/providers.routes")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});