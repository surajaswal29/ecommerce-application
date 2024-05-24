// const {razorpay} = require('../index');

// exports.createOrder = async (req, res) => {
//     const { amount, currency, receipt } = req.body;
//     try {
//         const order = await razorpay.orders.create({ amount, currency, receipt });
//         res.status(200).json({ order });
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }
