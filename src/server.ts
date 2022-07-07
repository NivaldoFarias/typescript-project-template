import { Request, Response } from 'express';

import AppLog from './events/AppLog';
import app from './app';
import './config/setup';

const PORT = process.env.PORT || 5000;

app.get('/', async (_req: Request, res: Response) => res.send('Online'));
app.listen(PORT, () => AppLog('Server', `Server running on port ${PORT}`));
