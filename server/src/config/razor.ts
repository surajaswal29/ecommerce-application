import Razorpay from 'razorpay';

// Define the setup function to initialize Razorpay
export const razorSetup = (): Razorpay => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  return razorpay;
};

// Export the initialized Razorpay instance
export default razorSetup();
