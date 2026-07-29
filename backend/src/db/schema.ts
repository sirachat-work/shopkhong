import { pgTable, serial, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// 1. สร้าง Enum สำหรับ Role
export const roleEnum = pgEnum('role', ['user', 'seller', 'admin']);

// 2. สร้างตาราง users
export const users = pgTable('users', {
  // serial = เลข ID รันอัตโนมัติ (1, 2, 3...) และเป็น Primary Key
  id: serial('user_id').primaryKey(),

  // varchar = ข้อความระบุความยาว, .notNull() = ห้ามเป็นค่าว่าง, .unique() = ห้ามซ้ำ
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),

  // role กำหนด default เป็น 'user'
  role: roleEnum('role').default('user').notNull(),

  // timestamp บันทึกเวลาปัจจุบันอัตโนมัติเมื่อสร้าง
  createdAt: timestamp('created_at').defaultNow().notNull(),
});