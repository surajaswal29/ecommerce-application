const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Get All Product
router.route("/products").get(productController.getAllProducts);

// Get product details
router.route("/product/:id").get(productController.getProductDetails);

// Create Product
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.createProduct
  );

// Update Product
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.updateProduct
  );

// Delete Product
router
  .route("/admin/product/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.deleteProduct
  );

//Create Reviews
router
  .route("/review")
  .put(isAuthenticatedUser, productController.createProductReview);

// Get Reviews and Delete Routes
router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(isAuthenticatedUser, productController.deleteReviews);
module.exports = router;
