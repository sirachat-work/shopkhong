import dotenv from 'dotenv';
import { z } from 'zod';

// โหลดค่าจากไฟล์ .env
dotenv.config();

// กำหนด Schema ตรวจสอบตัวแปร Environment
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),

  // ตรวจสอบว่า DATABASE_URL ต้องเป็น Format URL ที่ถูกต้อง
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is required',
  }).url('DATABASE_URL must be a valid URL string'),

  // ตรวจสอบว่ามี REDIS_URL ถูกส่งมาไหม
  REDIS_URL: z.string({
    required_error: 'REDIS_URL is required',
  }),

  // JWT Config
  JWT_SECRET: z.string().min(8, 'JWT_SECRET should be at least 8 characters long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

// ทำการ Parse และ Validate ค่ากระบวนการนี้จะ Throw Error ทันทีถ้าข้อมูลไม่ถูกต้อง
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(_env.error.format(), null, 2));
  process.exit(1); // ปิดแอปทันทีถ้าเกิด Error
}

// Export ตัวแปร env ที่ผ่านการ Validate และมี Type ปลอดภัยแล้วไปใช้งานในโปรเจกต์
export const env = _env.data;
