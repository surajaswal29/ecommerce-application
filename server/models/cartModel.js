const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
})

// calculate total price & total cart items before saving
cartSchema.pre("save", function (next) {
  this.totalPrice = this.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  this.totalItems = this.cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
  next()
})

//calculate total price & total cart items after updating document
cartSchema.post(
  ["findOneAndUpdate", "findByIdAndUpdate", "updateOne", "update"],
  function (cart) {
    const totalItems = cart.cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    )
    const totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )

    cart.totalItems = totalItems
    cart.totalPrice = totalPrice

    console.log(cart)
    cart.save()
  }
)

module.exports = mongoose.model("Cart", cartSchema, "cart")
