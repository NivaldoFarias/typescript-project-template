import AppLog from './events/AppLog.js';
import app from './app.js';
import './config/setup.js';
const PORT = process.env.PORT || 5000;
app.get('/', async (_req, res) => res.send('Online'));
app.listen(PORT, () => AppLog('Server', `Server running on port ${PORT}`));
