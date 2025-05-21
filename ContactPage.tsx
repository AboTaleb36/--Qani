import React from 'react';
import { Facebook, Linkedin, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">اتصل بنا</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">معلومات التواصل</h2>
        <p className="text-gray-600 mb-6">
          يسعدنا تلقي استفساراتكم واقتراحاتكم لتحسين الخدمة. يمكنكم التواصل معنا من خلال الوسائل التالية:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="https://www.facebook.com/al.king.397948" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Facebook size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">فيسبوك</h3>
            <p className="text-center text-gray-600 truncate w-full">al.king.397948</p>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/abdalla-abo-taleb-5a7903286/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-700 hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-blue-50 rounded-full mb-4">
              <Linkedin size={32} className="text-blue-700" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">لينكد إن</h3>
            <p className="text-center text-gray-600 truncate w-full">abdalla-abo-taleb</p>
          </a>
          
          <a 
            href="https://wa.me/0201033559171" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border-t-4 border-green-500 hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-green-100 rounded-full mb-4">
              <MessageSquare size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">واتساب</h3>
            <p className="text-center text-gray-600 truncate w-full">0201033559171</p>
          </a>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold text-green-700 mb-4">ساعدنا في تحسين الخدمة</h2>
        <p className="text-gray-600 mb-6">
          نرحب بآرائكم واقتراحاتكم لتطوير خدماتنا. يمكنكم إرسال ملاحظاتكم وتجاربكم مع استخدام الموقع ليساعدنا ذلك في تقديم خدمة أفضل لكم.
        </p>
        
        <form className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
            <input type="text" className="form-input" placeholder="أدخل اسمك" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input type="email" className="form-input" placeholder="أدخل بريدك الإلكتروني" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
            <textarea className="form-input h-32" placeholder="اكتب رسالتك هنا"></textarea>
          </div>
          
          <div className="mt-6">
            <button type="button" className="btn btn-primary">
              إرسال الرسالة
            </button>
          </div>
        </form>
      </div>
      
    
    </div>
  );
};

export default ContactPage;