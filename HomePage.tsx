import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Calculator, Cog as Cow, Home } from 'lucide-react';

const HomePage = () => {
  const services = [
    {
      icon: Wheat,
      title: "تركيبة علف",
      description: "أداة متطورة لحساب تركيبات الأعلاف بناءً على نسب البروتين والطاقة المطلوبة، مع اقتراحات لتحسين التركيبة.",
      link: "/feed"
    },
    {
      icon: Calculator,
      title: "حساب الاحتياجات",
      description: "حاسبة احتياجات الماشية من البروتين والطاقة بناءً على الوزن والجنس ومعدل النمو.",
      link: "/needs"
    },
    {
      icon: Cow,
      title: "حاسبة الأبقار الحلوب",
      description: "حاسبة متخصصة لتقدير احتياجات الأبقار الحلوب من العناصر الغذائية وتقديم توصيات التغذية المناسبة.",
      link: "/dairy"
    }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">مرحباً بك في قاني</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          منصة متخصصة لخدمات مربين المواشي، توفر حاسبات متقدمة لتركيب العلائق وحساب الاحتياجات الغذائية للماشية
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">خدماتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className="card group hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-200 transition-colors">
                  <service.icon size={48} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-800 text-center mb-4">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
              <div className="mt-6 text-center">
                <span className="btn btn-primary inline-flex items-center gap-2">
                  ابدأ الآن
                  <Home size={18} className="transform rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">لماذا قاني؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="card">
            <h3 className="text-xl font-semibold text-green-700 mb-2">دقة عالية</h3>
            <p className="text-gray-600">حسابات دقيقة مبنية على أحدث المعايير العلمية والمنشورات المتخصصة</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-green-700 mb-2">سهولة الاستخدام</h3>
            <p className="text-gray-600">واجهة بسيطة وسهلة الاستخدام تناسب جميع المستخدمين</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-green-700 mb-2">اقتراحات عملية</h3>
            <p className="text-gray-600">نقدم اقتراحات وتوصيات لتحسين تركيبات الأعلاف وزيادة الإنتاجية</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;