const express = require("express")
const router = express.Router()

// routes
const userRoutes = require("./userRoute")
const productRoutes = require("./productRoute")
const orderRoutes = require("./orderRoute")
const cartRoutes = require("./cartRoute")
const paymentRoutes = require("./paymentRoute")
const uploadRoutes = require("./uploadRoute")

router.use("/user", userRoutes)
router.use("/product", productRoutes)
router.use("/order", orderRoutes)
router.use("/cart", cartRoutes)
router.use("/payment", paymentRoutes)
router.use("/upload", uploadRoutes)

module.exports = router
