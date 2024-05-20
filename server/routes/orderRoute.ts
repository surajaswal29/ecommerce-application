const express = require("express");
const {
  newOrder,
  getOrderDetails,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrders,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Create New Order Routes
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// Get Single Order Routes
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);

// Get MyOrder Routes
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Get All orders Routes --Admin
router
  .route("/admin/orders/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Update Orders Routes --Admin
router
  .route("/admin/orders/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus);

// Delete Orders Routes --Admin
router
  .route("/admin/orders/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrders);

// export router
module.exports = router;
