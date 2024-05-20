import express from 'express';

// Import routes
import userRoutes from './user.routes';
// import productRoutes from './productRoute';
// import orderRoutes from './orderRoute';
// import cartRoutes from './cartRoute';

const router = express.Router();

// Use routes
router.use('/user', userRoutes);
// router.use('/product', productRoutes);
// router.use('/order', orderRoutes);
// router.use('/cart', cartRoutes);

export default router;
