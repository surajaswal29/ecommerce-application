const express = require("express")
const {
  createPayment,
  paymentWebhook,
  getPaymentStatus,
} = require("../controllers/paymentController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

// Create Payment Request
router.route("/create-payment").post(isAuthenticatedUser, createPayment)

// Webhook endpoint (no authentication required)
router.route("/webhook").post(paymentWebhook)

// Get Payment Status
router
  .route("/payment-status/:payment_request_id")
  .get(isAuthenticatedUser, getPaymentStatus)

module.exports = router
