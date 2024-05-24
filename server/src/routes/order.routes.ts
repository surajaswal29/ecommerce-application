import express from 'express';
import { OrderController } from '../controllers';
import { UserAuth } from '../middleware';

const router = express.Router();

// Create New Order Routes
router.route('/create_order').post(UserAuth.isAuthenticatedUser, OrderController.createOrder);

// // Get Single Order Routes
// router.route('/order/:id').get(isAuthenticatedUser, getOrderDetails);

// // Get MyOrder Routes
// router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// // Get All orders Routes --Admin
// router.route('/admin/orders/all').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

// // Update Orders Routes --Admin
// router.route('/admin/orders/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus);

// // Delete Orders Routes --Admin
// router.route('/admin/orders/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrders);

// // export router
// module.exports = router;

export default router;
