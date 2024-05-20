const express = require("express")
const cartController = require("../controllers/cartController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/add_to_cart").post(isAuthenticatedUser, cartController.addToCart)

// getMyCart
router.route("/my_cart").get(isAuthenticatedUser, cartController.getMyCart)

// updateCart
router
  .route("/update_cart_item")
  .post(isAuthenticatedUser, cartController.updateCart)

// deleteCart
router
  .route("/delete_cart_item/:product")
  .delete(isAuthenticatedUser, cartController.deleteCartItem)

module.exports = router
