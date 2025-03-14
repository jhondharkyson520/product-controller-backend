import express from 'express';
import { configEnvironment } from './config/config';
import routes from './routes/routes';

const app =  express();
app.use(express.json());
app.use('/users', routes);
app.listen(configEnvironment.port, () => console.log('Server running on port 3000'));
