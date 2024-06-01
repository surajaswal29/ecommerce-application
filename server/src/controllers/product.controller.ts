import { Request, Response, NextFunction } from 'express';
import { Product, ProductReview } from '../models';
import { Constant, ErrorHandler, Mail, AsyncHandler, Types } from '../utils';
import { IAllProductParams, IAllProductQuery } from '../interfaces';

// create product -- Admin
export const createProduct = AsyncHandler(async (req: Types.IAuthRequest, res: Response) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
export const getAllProducts = AsyncHandler(
  async (req: Request<IAllProductParams, any, any, IAllProductQuery>, res: Response, next: NextFunction) => {
    let resultPerPage: number = Constant.RESULT_PER_PAGE;
    let pageNumber: number = 1;

    if (req.query.per_page && req.query.per_page !== 0) {
      resultPerPage = Number(req.query.per_page);
    } else if (req.query.per_page && req.query.per_page > 100) {
      resultPerPage = 100;
    }

    if (req.params.page && req.params.page > 0) {
      pageNumber = Number(req.params.page);
    }

    const productCount = await Product.countDocuments();

    const products = await Product.find()
      .limit(resultPerPage)
      .skip(resultPerPage * (pageNumber - 1));

    if (!products || products.length === 0) {
      return next(new ErrorHandler('Products Not Found', 404));
    }

    res.status(200).json({
      success: true,
      productCount,
      resultPerPage,
      data: products,
    });
  }
);

// Get Product Details
export const getProductDetails = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Products -- admin
export const updateProduct = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
export const deleteProduct = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted!',
  });
});

// Create Product Review or Update
export const createProductReview = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);

  return res.status(200).json({
    success: true,
    message: 'Product Reviewed!',
  });
});

// // Get Reviews
// export const getProductReviews = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   const product = await Product.findById(req.query.id);

//   if (!product) {
//     return next(new ErrorHandler('Product not Found', 404));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: product.reviews,
//   });
// });

// // Delete Reviews
// export const deleteReviews = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   const product = await Product.findById(req.query.productId);
//   if (!product) {
//     return next(new ErrorHandler('Product not Found', 404));
//   }

//   const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   const ratings = avg / reviews.length;

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     { reviews, ratings, numOfReviews },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//   });
// });
