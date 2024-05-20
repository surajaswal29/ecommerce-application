import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cloudinary from 'cloudinary';
// import Razorpay from 'razorpay';
import helmet from 'helmet';
import compression from 'compression';

// custom modules
import { connectToDatabase } from './config';
import { errorHandler } from './middleware';
import rootRoute from './routes';

try {
  const app: Express = express();

  const PORT: number = parseInt(process.env.PORT!) || 8000;

  // config
  dotenv.config();

  // handling uncaught exception
  process.on('uncaughtException', (err: Error) => {
    console.log(`Error: ${err.message}`);
    console.log(`closing server due to uncaught exception!`);

    process.exit(1);
  });

  // CORS
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
    })
  );

  // Database
  connectToDatabase();

  app.use(
    compression({
      level: 6,
      threshold: 0,
      filter: (req: Request, res: Response) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    })
  );
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // cloudinary init
  cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // export const razorpay = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID!,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET,
  // });

  app.use('/api/v1', rootRoute);

  // serve static files for view
  // app.use(express.static(path.join(__dirname, './view')));
  // app.get('*', (req: Request, res: Response) => {
  //   res.sendFile(path.resolve(__dirname, './view/index.html'));
  // });

  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
  });

  // unhandled promise rejection
  process.on('unhandledRejection', (err: any) => {
    console.log(`Error: ${err.message}`);
    console.log(`closing server due to unhandled error!`);
    server.close(() => {
      process.exit(1);
    });
  });
} catch (error) {
  console.log('dhjvshdvhdjcv');
  console.log('Error: ', error);
  process.exit(1);
}
