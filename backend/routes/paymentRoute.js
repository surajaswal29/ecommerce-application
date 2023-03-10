const express = require('express');

const router = express.Router();

const { processPayment, sendStripeAPIkey } = require('../controllers/paymentController');

const {isAuthenticatedUser} = require('../middleware/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeAPIkey);

module.exports = router;