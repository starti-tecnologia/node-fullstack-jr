const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin:"http://localhost:8081"
}
app.use(cors(corsOptions));
// Parse json objects
app.use(bodyParser.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync db
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
//db.sequelize.sync();

//routes
require("./app/routes/product.routes")(app)
require("./app/routes/order.routes")(app)
// set port, listen for requests
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});