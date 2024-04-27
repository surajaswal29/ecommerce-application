const express = require("express")
const router = express.Router()

// routes
const userRoutes = require("./userRoute")
const productRoutes = require("./productRoute")
const orderRoutes = require("./orderRoute")
const cartRoutes = require("./cartRoute")

router.use("/user", userRoutes)
router.use("/product", productRoutes)
router.use("/order", orderRoutes)
router.use("/cart", cartRoutes)

module.exports = router
