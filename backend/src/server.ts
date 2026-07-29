// backend/src/server.ts
import app from './app';
import { env } from './config/env';

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log('==================================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('📡 READY TO ACCEPT REQUESTS FROM FRONTEND');
  console.log('==================================================');
});