import express, {Request, Response, ErrorRequestHandler, NextFunction} from 'express';
import cors from 'cors';
import drinksRouter from './routers/drinks.router';
import orderRouter from './routers/order.router';

const app = express();

const allowedOrigins = ['http://localhost3000', 'http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

  app.use(cors(options));

  app.use(express.json());
  app.use('/drinks', drinksRouter);
  app.use('/orders', orderRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running`);
});
