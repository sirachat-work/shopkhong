// backend/src/services/auth.service.ts
import { db } from '../config/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const registerUser = async (email: string, password: string, username: string) => {
  console.log(`🔍 [SERVICE] Checking existing user in Neon DB for email: ${email}`);
  const existingUser = await db.select().from(users).where(eq(users.email, email));

  if (existingUser.length > 0) {
    console.log(`⚠️ [SERVICE] Registration aborted: Email ${email} already exists`);
    throw new Error('Email นี้ถูกใช้งานไปแล้ว');
  }

  console.log('🔒 [SERVICE] Hashing password with bcrypt...');
  const passwordHash = await bcrypt.hash(password, 10);

  console.log('💾 [SERVICE] Executing INSERT query into Neon PostgreSQL...');
  const [createdUser] = await db.insert(users).values({
    email,
    passwordHash,
    username,
  }).returning();

  console.log('🎉 [SERVICE] User saved to DB successfully! ID:', createdUser.id);
  return {
    id: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
    role: createdUser.role,
  };
};

export const loginUser = async (email: string, password: string) => {
  console.log(`🔍 [SERVICE] Searching user in Neon DB for email: ${email}`);
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    console.log(`⚠️ [SERVICE] User not found for email: ${email}`);
    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  // ==========================================
  // 🐞 เพิ่ม Log Debug เพื่อเช็คค่าจริงจาก DB ที่นี่
  // ==========================================
  console.log('🐞 [DEBUG] Password from Request:', `"${password}"`);
  console.log('🐞 [DEBUG] PasswordHash in DB:', `"${user.passwordHash}"`);
  console.log('🐞 [DEBUG] PasswordHash Length:', user.passwordHash?.length || 0);
  // ==========================================

  console.log('🔑 [SERVICE] Verifying password hash...');
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    console.log('⚠️ [SERVICE] Password mismatch for email:', email);
    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  console.log('🎟️ [SERVICE] Generating JWT Token...');
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN || '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
};