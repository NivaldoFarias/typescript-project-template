import express, { json } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';

import ExceptionHandler from './events/AppError';
import router from './routes/index';

const app = express();
app.use(cors());
app.use(json());
app.use(helmet());
app.use(router);
app.use(ExceptionHandler);

export default app;
