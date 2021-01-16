const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/auth");
const ordersController = require("../../controllers/OrdersController");

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ordersController.baseRoute(req, res);
    }
  });
});

// get single order
router.get("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ordersController.getSingle(req, res);
    }
  });
});

// create order
router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ordersController.createSingle(req, res);
    }
  });
});

// update order
router.put("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ordersController.updateSingle(req, res);
    }
  });
});

// delete member
router.delete("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ordersController.deleteSingle(req, res);
    }
  });
});

module.exports = router;
