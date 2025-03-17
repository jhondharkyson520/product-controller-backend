import express from 'express';
import { configEnvironment } from './config/config';
import routesUser from './routes/routes-users';

const app =  express();
app.use(express.json());
app.use('/users', routesUser);
app.listen(configEnvironment.port, () => console.log('Server running on port 3000'));
