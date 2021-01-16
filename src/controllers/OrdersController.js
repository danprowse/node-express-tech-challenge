const nanoid = require("nanoid");
const mongodb = require("mongodb");

// get all orders
exports.baseRoute = async (req, res) => {
  const orders = await loadOrdersCollection();
  const allOrders = await orders.find({}).toArray();
  res.status(200).json(allOrders);
};

// get single order
exports.getSingle = async (req, res) => {
  const orders = await loadOrdersCollection();
  const order = await orders.findOne({ orderId: req.params.id });
  res.status(200).json(order);
};

//create new order
exports.createSingle = async (req, res) => {
  const orders = await loadOrdersCollection();
  const newId = nanoid.nanoid();
  await orders.insertOne({
    orderId: newId,
    vehicleManufacturer: "",
    model: "",
    totalPrice: 0,
    orderTimestamp: Math.floor(Date.now() / 1000),
  });
  res.status(201).json({
    msg: "New order created",
    newOrderId: newId,
  });
};

// delete single order
exports.deleteSingle = async (req, res) => {
  const orders = await loadOrdersCollection();
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
  const orders = await loadOrdersCollection();
  // TODO check to see if id exist
  const exist = await orders.findOne({ orderId: req.params.id });
  const updatedOrder = req.body;
  const updateDocument = {
    $set: {
      vehicleManufacturer: req.body.vehicleManufacturer,
      model: req.body.model,
      totalPrice: req.body.totalPrice
    },
  };
  // if doc to update is found update doc
  if (exist) {
    try {
      await orders.updateOne({ orderId: req.params.id }, updateDocument);
      res.json({ msg: "order updated"})
    } catch (err) {
      res.json({
        error: err.message,
      });
    }
  } else {
    // doc not found
    res.status(404).json({
      msg: `Order does not exist with the id of: ${req.params.id}`,
    });
  }
};

async function loadOrdersCollection() {
  const client = await mongodb.MongoClient.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.db("GForcesVehicleOrders").collection("VehicleOrders");
}
