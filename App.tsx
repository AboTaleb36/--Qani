import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sprout, Wheat, Home, Calculator, Phone, Cog as Cow } from 'lucide-react';
import HomePage from './pages/HomePage';
import FeedFormulationPage from './pages/FeedFormulationPage';
import AnimalNeedsPage from './pages/AnimalNeedsPage';
import ContactPage from './pages/ContactPage';
import DairyCowCalculatorPage from './pages/DairyCowCalculatorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col rtl" dir="rtl">
        <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold transition-transform hover:scale-105">
                <Sprout size={32} />
                <span>قاني</span>
              </Link>
              <nav className="hidden md:flex space-x-6 space-x-reverse">
                <Link to="/" className="px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Home size={18} />
                  <span>الرئيسية</span>
                </Link>
                <Link to="/feed" className="px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Wheat size={18} />
                  <span>تركيبة علف</span>
                </Link>
                <Link to="/needs" className="px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Calculator size={18} />
                  <span>حساب الاحتياجات</span>
                </Link>
                <Link to="/dairy" className="px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Cow size={18} />
                  <span>حاسبة الأبقار الحلوب</span>
                </Link>
                <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Phone size={18} />
                  <span>اتصل بنا</span>
                </Link>
              </nav>
              <div className="md:hidden">
                {/* Mobile menu button would go here */}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedFormulationPage />} />
            <Route path="/needs" element={<AnimalNeedsPage />} />
            <Route path="/dairy" element={<DairyCowCalculatorPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="bg-green-900 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold">قاني - خدمات مربين المواشي</p>
              </div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/al.king.397948" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  فيسبوك
                </a>
                <a href="https://www.linkedin.com/in/abdalla-abo-taleb-5a7903286/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  لينكد إن
                </a>
                <a href="https://wa.me/0201033559171" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  واتساب
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-green-200">
              Created by/Abdalla Abo Taleb © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;