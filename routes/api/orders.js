const nanoid = require('nanoid');
const express = require('express');
const router = express.Router();
const orders = require('../../db/test-data');

router.get('/', (req , res) => {
  res.status(200);
  res.json(orders);
})

// get single order
router.get('/:id', (req, res) => {
  const found = orders.some(order => order.id === req.params.id);
  if (found) {
    res.status(200).json(orders.filter(order => order.id === req.params.id))
  } else {
    res.status(404).json({ msg: `order does not exist with the id of: ${req.params.id}`});
  }
})

// create order
router.post('/', (req, res) => {
  const newOrder = {
    id: nanoid.nanoid(),
    vehicleManufacturer: '',
    model: '',
    totalPrice: 0 
  }

  orders.push(newOrder);
  
  res.status(201).json({
    msg: 'New order created',
    newOrderId: newOrder.id
  });
})

// update order
router.put('/:id', (req, res) => {
  const found = orders.some(order => order.id === req.params.id);
  console.log(req.body);
  if (found) {
    const updatedOrder = req.body;
    orders.forEach(order => {
      if(order.id === req.params.id) {
        order.vehicleManufacturer = updatedOrder.vehicleManufacturer ? updatedOrder.vehicleManufacturer : order.vehicleManufacturer;
        order.model = updatedOrder.model ? updatedOrder.model : order.model;
        order.totalPrice = updatedOrder.totalPrice ? parseInt(updatedOrder.totalPrice) : order.totalPrice;
        res.status(200).json({msg: 'Order was updated', order});
      }
    }) 
  } else {
    res.status(404).json({ msg: `Order does not exist with the id of: ${req.params.id}`});
  }
})

// delete member
router.delete('/:id', (req, res) => {
  const found = orders.some(order => order.id === req.params.id);
  if (found) {
    //delete order
    res.status(200).json({ msg: 'order deleted', orders: orders.filter(order => order.id !== req.params.id)});
  } else {
    res.status(404).json({ msg: `order does not exist with the id of: ${req.params.id}`});
  }
})

module.exports = router;