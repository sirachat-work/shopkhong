'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === 'login';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await authService.login({
          email: formData.email,
          password: formData.password,
        });
        
        // เก็บ Token ลง LocalStorage (หรือ Cookies)
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        router.push('/'); // เข้าสู่ระบบสำเร็จ พาไปหน้าหลัก
      } else {
        await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        router.push('/login'); // สมัครสำเร็จ พาไปหน้า Login
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[650px] transition-all duration-300">
        
        {/* ฝั่งซ้าย: Brand Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight hover:opacity-90">
              <div className="w-10 h-10 bg-white text-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span>ShopKhong</span>
            </Link>
          </div>

          <div className="relative z-10 my-8 space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {isLogin ? 'ต้อนรับการกลับมา ช้อปต่อไม่สะดุด' : 'เปิดร้านค้า หรือช้อปสินค้าดีลเด็ด'}
            </h1>
            <p className="text-orange-100 text-sm md:text-base">
              แพลตฟอร์มศูนย์กลางที่เชื่อมต่อผู้ซื้อและผู้ขายทั่วประเทศ
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium text-orange-50">
                <ShieldCheck className="w-5 h-5 text-amber-200" />
                <span>การันตีรับเงินคืน หากไม่ได้รับสินค้า</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-orange-50">
                <Zap className="w-5 h-5 text-amber-200" />
                <span>ระบบจัดการหลังร้าน อัปเดตเรียลไทม์</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-orange-200">
            © 2026 ShopKhong Inc. All rights reserved.
          </div>
        </div>

        {/* ฝั่งขวา: Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
          
          {/* Tab Switcher ใช้ Router เปลี่ยน URL แบบลื่นไหล */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl flex relative">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  isLogin ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                เข้าสู่ระบบ
              </button>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  !isLogin ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'ยินดีต้อนรับกลับมา!' : 'สร้างบัญชีผู้ใช้ใหม่'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {isLogin ? 'กรอกข้อมูลด้านล่างเพื่อเข้าสู่ระบบของคุณ' : 'กรอกข้อมูลเพียงไม่กี่ขั้นตอนเพื่อเริ่มใช้งาน'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-100">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">ชื่อผู้ใช้ (Username)</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="เช่น somchai_shop"
                      className="w-full bg-gray-50 text-sm border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">อีเมล (Email)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 text-sm border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-700">รหัสผ่าน (Password)</label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 text-sm border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">ยืนยันรหัสผ่าน</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 text-sm border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>กำลังดำเนินการ...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'เข้าสู่ระบบ' : 'สร้างบัญชีผู้ใช้'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-gray-500 pt-4">
              {isLogin ? (
                <span>
                  ยังไม่มีบัญชีผู้ใช้ใช่ไหม?{' '}
                  <button type="button" onClick={() => router.push('/register')} className="font-bold text-orange-600 hover:underline">
                    สมัครสมาชิกฟรี
                  </button>
                </span>
              ) : (
                <span>
                  มีบัญชีผู้ใช้อยู่แล้ว?{' '}
                  <button type="button" onClick={() => router.push('/login')} className="font-bold text-orange-600 hover:underline">
                    เข้าสู่ระบบ
                  </button>
                </span>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}