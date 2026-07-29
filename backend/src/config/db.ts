import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from './env';
import * as schema from '../db/schema';

// เชื่อมต่อผ่าน HTTP Driver ของ Neon (เหมาะสำหรับ Serverless / Node.js)
const sql = neon(env.DATABASE_URL);

// Export db instance พร้อม Schema ทั้งหมด
export const db = drizzle(sql, { schema });
