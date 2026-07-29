// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // แนะนำให้นำเครื่องหมาย / ท้าย URL ออกเพื่อให้ CORS ทำงานได้แม่นยำขึ้นครับ
  credentials: true,
}));

app.use(express.json());

// Log สำหรับดูว่ามี HTTP Request ยิงเข้ามาถึง Express ไหม
app.use((req, res, next) => {
  console.log('--------------------------------------------------');
  console.log(`🌐 [HTTP REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/auth', authRoutes);

export default app;