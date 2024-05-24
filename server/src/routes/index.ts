import express from 'express';

// Import routes
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
// import cartRoutes from './cartRoute';

const router = express.Router();

// Use routes
router.use('/user', userRoutes);
router.use('/product', productRoutes);
// router.use('/product', productRoutes);
router.use('/order', orderRoutes);
// router.use('/cart', cartRoutes);

export default router;
