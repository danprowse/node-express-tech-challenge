const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/auth");
const ordersController = require("../../controllers/OrdersController");

router.get("/", verifyToken, (req, res) => ordersController.baseRoute(req, res));

// get single order
router.get("/:id", verifyToken, (req, res) => ordersController.getSingle(req, res));

// create order
router.post("/", verifyToken, (req, res) => ordersController.createSingle(req, res));

// update order
router.put("/:id", verifyToken, (req, res) => ordersController.updateSingle(req, res));

// delete member
router.delete("/:id", verifyToken, (req, res) => ordersController.deleteSingle(req, res));

module.exports = router;
