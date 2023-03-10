const catchAsyncErrors = require('../middleware/catchAsyncError');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// process payment controllers
exports.processPayment = catchAsyncErrors(async (req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        },
    });

    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    });
});

// send API Key to frontend
exports.sendStripeAPIkey = catchAsyncErrors(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        StripeAPIKey:process.env.STRIPE_API_KEY
    })
});