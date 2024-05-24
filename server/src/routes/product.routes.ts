import express from 'express';
import { ProductController } from '../controllers';
import { UserAuth, UploadImage } from '../middleware';

const router = express.Router();

// Get All Product
router.route('/products').get(ProductController.getAllProducts);

// Get product details
router.route('/product/:id').get(ProductController.getProductDetails);

// Create Product
router
  .route('/admin/product/new')
  .post(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), ProductController.createProduct);

// Update Product
router
  .route('/admin/product/:id')
  .put(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), ProductController.updateProduct);

// Delete Product
router
  .route('/admin/product/:id')
  .delete(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), ProductController.deleteProduct);

//Create Reviews
router.route('/review').put(UserAuth.isAuthenticatedUser, ProductController.createProductReview);

export default router;
