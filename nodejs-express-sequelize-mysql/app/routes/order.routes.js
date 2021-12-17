module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", orders.create);

  // Retrieve all orders
  router.get("/", orders.findAll);

  // Retrieve a single Product with id
  router.get("/:id", orders.findOne);

  // Update a Product with id
  router.put("/:id", orders.update);

  // Delete a Product with id
  router.delete("/:id", orders.delete);

  // Delete all orders
  router.delete("/", orders.deleteAll);

  // Remove a product from an Order
  router.delete("/remove/product/:id", orders.removeProduct);
  
  // Add product to an Order
  router.post("/:id", orders.addProductToOrder)

  app.use('/api/orders', router);
};