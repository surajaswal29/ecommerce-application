const catchAsyncError = require("../middleware/catchAsyncError")
const cart = require("../models/cartModel")
const Product = require("../models/productModel")

// Controller function to add items to the cart
exports.addToCart = catchAsyncError(async (req, res, next) => {
  // Extract necessary data from request body and user object
  const bodyData = ["product", "quantity"]

  const { product, quantity } = req.body
  const userId = req.user.id

  const productData = await Product.findById(product)

  // Check if multiple items are being added
  const isMultiItems = Array.isArray(req.body)

  if (!isMultiItems) {
    Object.keys(req.body).forEach((key) => {
      if (!bodyData.includes(key)) {
        return next(new Error("Invalid request body", 400))
      }
    })
  }

  if (isMultiItems) {
    if (req.body.filter((i) => !i.product).length > 0) {
      console.log("M")
      return next(new Error("Product is required", 404))
    }
  }

  if (!isMultiItems && !product)
    return next(new Error("Product is required", 404))

  // Find the user's cart
  const cartItem = await cart.findOne({ user: userId })

  // If user already has a cart
  if (cartItem) {
    let cartItemsData = cartItem.cartItems

    // If multiple items are being added
    if (isMultiItems) {
      const productIds = cartItemsData.map((item) => item.product.toString())
      // Loop through new items
      for (let i = 0; i < req.body.length; i++) {
        // If product is not already in the cart, add it
        if (!productIds.includes(req.body[i].product)) {
          const productData = await Product.findById(req.body[i].product)
          req.body[i].price = productData.price
          cartItemsData.push(req.body[i])
        } else {
          // If product is already in cart, update quantity
          cartItemsData[i].quantity = req.body[i].quantity
        }
      }
    } else {
      // If single item is being added and it's already in the cart
      if (cartItemsData.some((item) => item.product.toString() === product)) {
        const itemToUpdate = cartItemsData.find(
          (item) => item.product.toString() === product
        )
        const itemIndex = cartItemsData.indexOf(itemToUpdate)

        cartItemsData[itemIndex].quantity = quantity
      } else {
        cartItemsData.push({
          product: product,
          quantity,
          price: productData.price,
        })
      }
    }
    // Update cart with new cart items
    const updatedCartItem = await cart.findByIdAndUpdate(
      cartItem._id,
      { cartItems: cartItemsData },
      { new: true }
    )
    // If cart is not updated, return error
    if (!updatedCartItem) return next(new Error("Cart Item not updated", 404))
    // Send response with updated cart data
    return res.json({
      success: true,
      data: updatedCartItem,
    })
  }

  for (let i = 0; i < req.body.length; i++) {
    const product = await Product.findById(req.body[i].product)
    req.body[i].price = product.price
  }
  console.log(await Product.findById(product)?.price)
  // If user doesn't have a cart, create a new one
  const newCartItem = await cart.create({
    user: userId,
    cartItems: isMultiItems
      ? req.body
      : [
          {
            product,
            quantity,
            price: productData.price,
          },
        ],
  })
  // Send response with new cart data
  return res.status(201).json({
    success: true,
    newCartItem,
  })
})

// 📦 Controller function to get user's cart
exports.getMyCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id
  // 🛒 Find user's cart and populate with product details
  const myCartData = await cart
    .findOne({ user: userId })
    .populate("cartItems.product")
  // If cart is empty, return error
  if (!myCartData) return next(new Error("Cart is empty", 404))
  // Send response with cart data
  res.status(200).json({
    success: true,
    totalPrice: myCartData.totalPrice,
    totalItems: myCartData.totalItems,
    data: myCartData.cartItems,
  })
})

// 🔄 Controller function to update cart item quantity
exports.updateCart = catchAsyncError(async (req, res, next) => {
  const { product, quantity } = req.body
  const userId = req.user.id
  // 🛒 Find user's cart
  const cartData = await cart.findOne({ user: userId })
  // If cart is empty, return error
  if (!cartData) return next(new Error("Cart is empty", 404))
  // If product is not in cart, return error
  if (!cartData.cartItems.some((item) => item.product == product)) {
    return next(new Error("Product not in cart", 404))
  }
  // Update cart item quantity
  const updateCartItem = await cart.findByIdAndUpdate(
    cartData._id,
    {
      $set: {
        "cartItems.$[item].quantity": quantity,
      },
    },
    {
      arrayFilters: [{ "item.product": product }],
      new: true,
    }
  )
  // If cart item is not updated, return error
  if (!updateCartItem) return next(new Error("Cart Item not updated", 404))
  // Send success response
  res.status(200).json({
    success: true,
    message: "Cart Item updated successfully",
  })
})

// ❌ Controller function to delete item from cart
exports.deleteCartItem = catchAsyncError(async (req, res, next) => {
  const { product } = req.params
  const userId = req.user.id
  // 🛒 Find user's cart
  const cartData = await cart.findOne({ user: userId })
  // If cart is empty, return error
  if (!cartData) return next(new Error("Cart is empty", 404))
  // If product is not in cart, return error
  if (!cartData.cartItems.some((item) => item.product == product)) {
    return next(new Error("Product not in cart", 404))
  }
  // Delete cart item
  const deleteCartItem = await cart.findByIdAndUpdate(
    cartData._id,
    {
      $pull: { cartItems: { product: product } },
    },
    { new: true }
  )
  // If cart item is not deleted, return error
  if (!deleteCartItem) return next(new Error("Cart Item not deleted", 404))
  // Send success response
  res.status(200).json({
    success: true,
    message: "Cart Item deleted successfully",
  })
})
