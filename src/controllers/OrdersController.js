const nanoid = require("nanoid");
const Database = require('../db/Database');
const collection = new Database("GForcesVehicleOrders", "VehicleOrders");
// get all orders
exports.baseRoute = async (req, res) => {
  const orders = await collection.loadConnection();
  try {
    const allOrders = await orders.find({}).toArray();
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

// get single order
exports.getSingle = async (req, res) => {
  const orders = await collection.loadConnection();
  await orders
    .findOne({ orderId: req.params.id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
};

//create new order
exports.createSingle = async (req, res) => {
  const orders = await collection.loadConnection();
  const newId = nanoid.nanoid();
  await orders
    .insertOne({
      orderId: newId,
      vehicleManufacturer: "",
      model: "",
      totalPrice: 0,
      orderTimestamp: Math.floor(Date.now() / 1000),
    })
    .then(() => {
      res.status(201).json({
        msg: "New order created",
        newOrderId: newId,
      });
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
};

// delete single order
exports.deleteSingle = async (req, res) => {
  const orders = await collection.loadConnection();
  // TODO orders.find(id) to see if order exist
  await orders.deleteOne({ orderId: req.params.id }).catch((err) => {
    res.status(404).json({
      msg: "Error",
      errMsg: err.message,
    });
  });
  res.status(200).json({
    msg: "order deleted",
    orders: await orders.find({}).toArray(),
  });
};

// update order
exports.updateSingle = async (req, res) => {
  const orders = await collection.loadConnection();
  // TODO check to see if id exist
  const exist = await orders.findOne({ orderId: req.params.id });
  const updatedOrder = req.body;
  const updateDocument = {
    $set: {
      vehicleManufacturer: updatedOrder.vehicleManufacturer,
      model: updatedOrder.model,
      totalPrice: updatedOrder.totalPrice,
    },
  };
  // if doc to update is found update doc
  if (exist) {
    await orders
      .updateOne({ orderId: req.params.id }, updateDocument)
      .then(() => {
        // TODO: send back order to prove its been updated
        res.json({ msg: "order updated" });
      })
      .catch((err) => {
        res.json({
          error: err
        });
      });
  } else {
    // doc not found
    res.status(404).json({
      msg: `Order does not exist with the id of: ${req.params.id}`,
    });
  }
};
