const db = require("../models");
const Product = db.products;
const Order = db.orders;

// Create and Save a new Order wile adding a product 
exports.create = async (req, res) => {
  if (!req.body.clientName || !req.body.orderNumber || !req.body.email || !req.body.status) {
    res.status(400).send({
      message: "All fields must be completed!"
    });
    return;
  }

  const productId = req.body.productId;
  const productToAdd = await Product.findByPk(productId)

  // Create a Order
  const order = {
    clientName: req.body.clientName,
    orderNumber: req.body.orderNumber,
    email: req.body.email,
    status: req.body.status,
  };

  let orderCreated = await Order.create(order)
  await orderCreated.addProduct(productToAdd, { through: { selfGranted: false } })
  let result = await Order.findByPk(orderCreated.id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id","name", "unitaryValue"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
  res.send(result)
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order.findAll({
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id","name", "unitaryValue"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id","name", "unitaryValue"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Order with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};

// Update a Order by the id in the request
exports.update = async(req, res) => {
  const id = req.params.id;
  
  const orderToBeUpdated = await Order.findByPk(id)
  console.log("orderToBeUpdated >>>>>>", orderToBeUpdated.status )
  console.log("req.body.status>>>>>>", req.body.status )
  if (orderToBeUpdated.status !== "opened") {
    res.send({
      message: "canceled or paid status cant be modified"
    })
  }


  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + id
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    });
};

// Add a Product to an Order
exports.addProductToOrder = (req, res) => {
  const orderId = req.params.id;
  const productId = req.body.productId

  function addProduct(orderId, productId) {
    return Order.findByPk(orderId)
      .then((order) => {
        if (!order) {
          console.log("Order not found!");
          return null;
        }
        return Product.findByPk(productId).then((product) => {
          if (!product) {
            console.log("Product not found!");
            return null;
          }

          order.addProduct(product);
          console.log(`>> added Product id=${product.id} to Order id=${order.id}`);
          return order;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Product to Order: ", err);
      });
  };

  addProduct(orderId, productId)
    .then(data => {
      res.send(data);
    })

};

// Remove a product from an Order
exports.removeProduct = async (req, res) => {
  const {productId} = req.body
  const orderId = req.params.id

  const orderToBeEdited = await Order.findByPk(orderId)
  const productToRemove = await Product.findByPk(productId)
  await orderToBeEdited.removeProduct(productToRemove)
  const result = await Order.findByPk(orderToBeEdited.id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id","name", "unitaryValue"],
        through: {
          attributes: [],
        }
      },
    ],
  })
  res.send(result)
};