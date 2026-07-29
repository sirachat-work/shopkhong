'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Star, ChevronRight } from 'lucide-react';

// Dummy Data สำหรับสินค้า
const dummyProducts = [
  { id: 1, name: 'เสื้อยืด Oversize สไตล์เกาหลี เนื้อผ้าเกรดพรีเมียม', price: 290, rating: 4.8, sold: '1.2k', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60' },
  { id: 2, name: 'หูฟังไร้สาย Bluetooth 5.3 เสียงเบสแน่น แบตอึด', price: 890, rating: 4.9, sold: '3.4k', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { id: 3, name: 'กระเป๋าผ้า Canvas มินิมอล ใส่ของได้จุใจ', price: 150, rating: 4.7, sold: '850', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60' },
  { id: 4, name: 'แก้วเก็บความเย็น 30 Oz ลายการ์ตูนสุดน่ารัก', price: 199, rating: 4.6, sold: '5.1k', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca13?w=500&auto=format&fit=crop&q=60' },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* --- Top Navbar --- */}
      <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="text-2xl font-black text-orange-600 tracking-tight cursor-pointer">
            ShopKhong
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="ค้นหาสินค้า, ร้านค้า หรือหมวดหมู่..." 
              className="w-full bg-gray-100 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium hidden md:inline">บัญชีของฉัน</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* Hero Banner Dummy */}
        <div className="w-full h-48 md:h-80 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-md flex items-center justify-between px-8 text-white overflow-hidden relative">
          <div className="z-10 space-y-3">
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Mega Sale 5.5</span>
            <h1 className="text-3xl md:text-5xl font-extrabold">ช้อปสินค้าดีลเด็ด ลดสูงสุด 80%</h1>
            <p className="text-white/90 text-sm md:text-base">เปิดร้านค้ากับเราวันนี้ ฟรีค่าธรรมเนียม!</p>
            <button className="bg-white text-orange-600 font-bold px-6 py-2.5 rounded-full shadow hover:bg-orange-50 transition-transform active:scale-95 duration-150">
              ช้อปเลย
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">หมวดหมู่ยอดนิยม</h2>
            <span className="text-sm text-orange-600 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
              ดูทั้งหมด <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {['แฟชั่น', 'อิเล็กทรอนิกส์', 'บ้านและไลฟ์สไตล์', 'ความงาม', 'มือถือ', 'กีฬา', 'กระเป๋า', 'อื่นๆ'].map((cat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200 font-bold">
                  {cat[0]}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center truncate w-full">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">สินค้าแนะนำสำหรับคุณ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
                <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <h3 className="text-sm font-medium line-clamp-2 text-gray-700 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">฿{product.price}</span>
                    <span className="text-xs text-gray-400">ขายแล้ว {product.sold} ชิ้น</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}