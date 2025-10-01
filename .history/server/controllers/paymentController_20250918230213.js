const axios = require("axios")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")

// Create Instamojo Payment Request
exports.createPayment = catchAsyncError(async (req, res, next) => {
  const {
    amount,
    purpose,
    buyer_name,
    email,
    phone,
    redirect_url,
    webhook_url,
    order_id,
  } = req.body

  // Validate required fields
  if (!amount || !purpose || !buyer_name || !email || !phone) {
    return next(new ErrorHandler("Missing required payment fields", 400))
  }

  try {
    // Instamojo API configuration
    const instamojoConfig = {
      baseURL: process.env.INSTAMOJO_BASE_URL || "https://test.instamojo.com",
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
    }

    // Payment request payload
    const paymentData = {
      purpose: purpose,
      amount: amount,
      currency: "INR",
      buyer_name: buyer_name,
      email: email,
      phone: phone,
      redirect_url:
        redirect_url || `${process.env.FRONTEND_URL}/payment-success`,
      webhook_url:
        webhook_url || `${process.env.BACKEND_URL}/api/v1/payment/webhook`,
      allow_repeated_payments: false,
      send_email: true,
      send_sms: true,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      metadata: {
        order_id: order_id || null,
      },
    }

    // Make API call to Instamojo
    const response = await axios.post(
      "/api/1.1/payment-requests/",
      paymentData,
      instamojoConfig
    )

    const { payment_request } = response.data

    res.status(200).json({
      success: true,
      payment_url: payment_request.longurl,
      payment_request_id: payment_request.id,
      order_id: order_id,
    })
  } catch (error) {
    console.error("Instamojo API Error:", error.response?.data || error.message)

    return next(
      new ErrorHandler(
        error.response?.data?.message || "Payment creation failed",
        error.response?.status || 500
      )
    )
  }
})

// Webhook endpoint for payment notifications
exports.paymentWebhook = catchAsyncError(async (req, res, next) => {
  try {
    const webhookData = req.body

    // Log webhook data for debugging
    console.log(
      "Instamojo Webhook Received:",
      JSON.stringify(webhookData, null, 2)
    )

    // Validate webhook data
    if (!webhookData.payment_id || !webhookData.payment_request_id) {
      return res.status(400).json({ error: "Invalid webhook data" })
    }

    // Extract payment details
    const {
      payment_id,
      payment_request_id,
      payment_status,
      amount,
      buyer_name,
      buyer_email,
      buyer_phone,
      purpose,
      created_at,
      fees,
      longurl,
      mac,
    } = webhookData

    // TODO: Verify MAC signature for security (optional but recommended)
    // const calculatedMac = calculateMac(webhookData);
    // if (mac !== calculatedMac) {
    //   return res.status(400).json({ error: 'Invalid MAC signature' });
    // }

    // Update order status based on payment status
    if (payment_status === "Credit") {
      // Payment successful
      console.log(
        `Payment successful for order: ${
          webhookData.metadata?.order_id || payment_request_id
        }`
      )

      // TODO: Update order status in database
      // await Order.findByIdAndUpdate(webhookData.metadata?.order_id, {
      //   paymentStatus: 'completed',
      //   paymentId: payment_id,
      //   paidAt: new Date(created_at)
      // });

      // TODO: Send confirmation email to customer
      // TODO: Update inventory
      // TODO: Send notification to admin
    } else if (payment_status === "Failed") {
      // Payment failed
      console.log(
        `Payment failed for order: ${
          webhookData.metadata?.order_id || payment_request_id
        }`
      )

      // TODO: Update order status in database
      // await Order.findByIdAndUpdate(webhookData.metadata?.order_id, {
      //   paymentStatus: 'failed',
      //   paymentId: payment_id
      // });
    } else {
      console.log(
        `Payment status: ${payment_status} for order: ${
          webhookData.metadata?.order_id || payment_request_id
        }`
      )
    }

    // Respond with 200 OK to acknowledge webhook
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    res.status(500).json({
      success: false,
      error: "Webhook processing failed",
    })
  }
})

// Get payment status
exports.getPaymentStatus = catchAsyncError(async (req, res, next) => {
  const { payment_request_id } = req.params

  if (!payment_request_id) {
    return next(new ErrorHandler("Payment request ID is required", 400))
  }

  try {
    const instamojoConfig = {
      baseURL: process.env.INSTAMOJO_BASE_URL || "https://test.instamojo.com",
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
    }

    const response = await axios.get(
      `/api/1.1/payment-requests/${payment_request_id}/`,
      instamojoConfig
    )

    const { payment_request } = response.data

    res.status(200).json({
      success: true,
      payment_request: {
        id: payment_request.id,
        status: payment_request.status,
        amount: payment_request.amount,
        purpose: payment_request.purpose,
        buyer_name: payment_request.buyer_name,
        email: payment_request.email,
        phone: payment_request.phone,
        created_at: payment_request.created_at,
        modified_at: payment_request.modified_at,
        payments: payment_request.payments,
      },
    })
  } catch (error) {
    console.error(
      "Get Payment Status Error:",
      error.response?.data || error.message
    )

    return next(
      new ErrorHandler(
        error.response?.data?.message || "Failed to get payment status",
        error.response?.status || 500
      )
    )
  }
})
