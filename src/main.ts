import express from 'express';
import { configEnvironment } from './config/config';
import routesUser from './routes/routes-users';
import routesProduct from './routes/routes-product';
import { routesReport } from './routes/routes-report';

const app =  express();
app.use(express.json());
app.use('/users', routesUser);
app.use('/products', routesProduct);
app.use('/reports', routesReport);
app.listen(configEnvironment.port, () => console.log('Server running on port 3000'));
