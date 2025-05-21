import React, { useState, useEffect } from 'react';

interface Material {
  name: string;
  protein: number;
  energy: number;
  maxPercent: number;
  actualAmount?: number;
  proteinContribution?: number;
  energyContribution?: number;
}

const FeedFormulationPage = () => {
  const [targetProtein, setTargetProtein] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [materials, setMaterials] = useState<Material[]>([{
    name: '',
    protein: 0,
    energy: 0,
    maxPercent: 0
  }]);
  const [resultData, setResultData] = useState<any>(null);

  const materialOptions = [
    { value: "ذرة صفراء", protein: 8.8, energy: 77, maxPercent: 40 },
    { value: "شعير", protein: 10, energy: 80, maxPercent: 30 },
    { value: "قمح", protein: 16.4, energy: 74, maxPercent: 10 },
    { value: "ذرة", protein: 10.6, energy: 77, maxPercent: 30 },
    { value: "نخالة قمح", protein: 17.2, energy: 62, maxPercent: 12.5 },
    { value: "كسب فول صويا", protein: 46.5, energy: 71, maxPercent: 12.5 },
    { value: "كسب عباد شمس", protein: 27.9, energy: 65, maxPercent: 10 },
    { value: "كسب بذرة القطن", protein: 40.7, energy: 60, maxPercent: 5 },
    { value: "برسيم مصري", protein: 22, energy: 80, maxPercent: 25 },
    { value: "تبن قمح", protein: 3.9, energy: 46, maxPercent: 15 },
    { value: "قصب سكر", protein: 5, energy: 45, maxPercent: 15 },
    { value: "مولاس", protein: 5.5, energy: 77, maxPercent: 5 },
    { value: "لب حمضيات", protein: 7, energy: 68, maxPercent: 7.5 },
    { value: "علف سمك", protein: 67.8, energy: 65, maxPercent: 2.5 },
    { value: "دقيق دم", protein: 93.9, energy: 67, maxPercent: 1.5 },
    { value: "دقيق ريش", protein: 85.7, energy: 66, maxPercent: 2.5 },
    { value: "جلوتين الذرة", protein: 60, energy: 83, maxPercent: 5 },
    { value: "جلوتوفيد 16%", protein: 16, energy: 65, maxPercent: 7.5 },
    { value: "رجيع كون", protein: 12, energy: 62, maxPercent: 7.5 },
    { value: "بلح جاف", protein: 5, energy: 72, maxPercent: 5 },
    { value: "دريس برسيم", protein: 12, energy: 55, maxPercent: 15 },
    { value: "تبن شعير", protein: 4, energy: 45, maxPercent: 15 },
    { value: "سيلاج الذرة", protein: 8, energy: 65, maxPercent: 35 },
    { value: "كسب بذرة الكتان", protein: 35, energy: 70, maxPercent: 7.5 },
    { value: "كسب السمسم", protein: 40, energy: 75, maxPercent: 10 },
    { value: "كسب بنجر السكر", protein: 12, energy: 60, maxPercent: 5 },
    { value: "قش الأرز", protein: 3, energy: 40, maxPercent: 7.5 },
    { value: "ردة أرز", protein: 13, energy: 68, maxPercent: 5 },
    { value: "عيش مصري", protein: 11, energy: 75, maxPercent: 7.5 },
    { value: "فول", protein: 25, energy: 85, maxPercent: 15 },
    { value: "علف مركز 16%", protein: 16, energy: 65, maxPercent: 40 },
    { value: "علف مركز 12%", protein: 12, energy: 60, maxPercent: 40 },
    { value: "علف مركز 14%", protein: 14, energy: 62, maxPercent: 40 },
    { value: "علف مركز 23%", protein: 23, energy: 70, maxPercent: 40 },
    { value: "علف مركز 18%", protein: 18, energy: 67, maxPercent: 40 }
  ];

  const addMaterial = () => {
    setMaterials([...materials, {
      name: '',
      protein: 0,
      energy: 0,
      maxPercent: 0
    }]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length > 1) {
      const updatedMaterials = [...materials];
      updatedMaterials.splice(index, 1);
      setMaterials(updatedMaterials);
    }
  };

  const handleMaterialChange = (index: number, option: any) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = {
      name: option.value,
      protein: option.protein,
      energy: option.energy,
      maxPercent: option.maxPercent
    };
    setMaterials(updatedMaterials);
  };

  const calculateMix = () => {
    if (isNaN(targetProtein) || isNaN(totalWeight) || materials.length === 0 || materials[0].name === '') {
      setResultData({
        error: "الرجاء إدخال النسبة المطلوبة للبروتين، والوزن الكلي، واختيار المواد العلفية."
      });
      return;
    }

    let sumMaxPercent = 0;
    materials.forEach(material => {
      sumMaxPercent += material.maxPercent;
    });

    let totalProtein = 0;
    let totalEnergy = 0;
    const calculatedMaterials = materials.map(material => {
      const actualAmount = (material.maxPercent / sumMaxPercent) * totalWeight;
      const proteinContribution = (material.protein / 100) * actualAmount;
      const energyContribution = (material.energy / 100) * actualAmount;
      totalProtein += proteinContribution;
      totalEnergy += energyContribution;
      return {
        ...material,
        actualAmount,
        proteinContribution,
        energyContribution
      };
    });

    const proteinPercent = (totalProtein / totalWeight) * 100;
    const energyPercent = (totalEnergy / totalWeight) * 100;
    const diff = proteinPercent - targetProtein;

    let suggestions = [];
    if (Math.abs(diff) > 1) {
      if (diff < 0) {
        // Protein is lower than target
        const highProteinMaterials = materials
          .filter(p => p.protein > 25)
          .map(p => ({ name: p.name, protein: p.protein }));
          
        if (highProteinMaterials.length > 0) {
          suggestions.push({
            type: 'increase',
            materials: highProteinMaterials
          });
        } else {
          suggestions.push({
            type: 'add',
            message: "أضف مواد ذات بروتين عالي مثل كسب فول صويا، دقيق دم، أو جلوتين الذرة."
          });
        }
      } else {
        // Protein is higher than target
        const highProteinMaterials = materials
          .filter(p => p.protein > 25)
          .map(p => ({ name: p.name, protein: p.protein }));
          
        const lowProteinMaterials = materials
          .filter(p => p.protein < 10)
          .map(p => ({ name: p.name, protein: p.protein }));
          
        if (highProteinMaterials.length > 0) {
          suggestions.push({
            type: 'decrease',
            materials: highProteinMaterials
          });
        }
        
        if (lowProteinMaterials.length > 0) {
          suggestions.push({
            type: 'add_low',
            materials: lowProteinMaterials
          });
        }
        
        if (highProteinMaterials.length === 0 && lowProteinMaterials.length === 0) {
          suggestions.push({
            type: 'general',
            message: "قلل المواد عالية البروتين أو أضف مواد منخفضة البروتين لتخفيف النسبة."
          });
        }
      }
    }

    setResultData({
      materials: calculatedMaterials,
      proteinPercent,
      energyPercent,
      diff,
      suggestions
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">تركيبة علف</h1>
      
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">النسبة المطلوبة للبروتين (%):</label>
            <input 
              type="number" 
              className="form-input" 
              value={targetProtein || ''} 
              onChange={(e) => setTargetProtein(parseFloat(e.target.value))}
              placeholder="أدخل نسبة البروتين"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الوزن المطلوب للخلطة (كجم):</label>
            <input 
              type="number" 
              className="form-input" 
              value={totalWeight || ''} 
              onChange={(e) => setTotalWeight(parseFloat(e.target.value))}
              placeholder="أدخل الكمية المطلوبة"
            />
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">المواد العلفية</h2>
        
        {materials.map((material, index) => (
          <div key={index} className="material-block">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">اختر المادة العلفية:</label>
                <select 
                  className="form-select" 
                  value={material.name}
                  onChange={(e) => {
                    const selectedOption = materialOptions.find(opt => opt.value === e.target.value);
                    if (selectedOption) {
                      handleMaterialChange(index, selectedOption);
                    }
                  }}
                >
                  <option value="" disabled>اختر</option>
                  {materialOptions.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.value} (بروتين: {option.protein}%, طاقة: {option.energy}%)
                    </option>
                  ))}
                </select>
              </div>
              
              {index > 0 && (
                <button 
                  className="btn btn-danger mt-4 md:mt-6" 
                  onClick={() => removeMaterial(index)}
                >
                  حذف المادة
                </button>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button className="btn btn-secondary" onClick={addMaterial}>
            إضافة مادة أخرى
          </button>
          <button className="btn btn-primary" onClick={calculateMix}>
            حساب التركيبة
          </button>
        </div>
      </div>
      
      {resultData && (
        <div className="result-container">
          {resultData.error ? (
            <div className="warning">
              ⚠️ {resultData.error}
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-green-700 mb-4">نتائج التركيبة</h3>
              
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>المادة العلفية</th>
                      <th>الكمية (كجم)</th>
                      <th>بروتين %</th>
                      <th>طاقة %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.materials.map((mat: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td>{mat.name}</td>
                        <td>{mat.actualAmount.toFixed(2)}</td>
                        <td>{mat.protein}%</td>
                        <td>{mat.energy}%</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-green-50 font-semibold">
                      <td colSpan={2}>الإجمالي</td>
                      <td>{resultData.proteinPercent.toFixed(2)}%</td>
                      <td>{resultData.energyPercent.toFixed(2)}%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {Math.abs(resultData.diff) > 1 && (
                <div className="warning mt-6">
                  <p className="font-semibold mb-2">
                    ⚠️ النسبة المحققة للبروتين <span className="font-bold">{resultData.proteinPercent.toFixed(2)}%</span> تختلف 
                    عن المطلوبة <span className="font-bold">{targetProtein}%</span> بفارق <span className="font-bold">{Math.abs(resultData.diff).toFixed(2)}%</span>.
                  </p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">💡 اقتراحات لتحسين النسبة:</p>
                    <ul className="list-disc list-inside space-y-1 pr-4">
                      {resultData.suggestions.map((suggestion: any, idx: number) => {
                        if (suggestion.type === 'increase') {
                          return suggestion.materials.map((mat: any, midx: number) => (
                            <li key={`inc-${idx}-${midx}`}>
                              زيادة كمية <strong>{mat.name}</strong> (بروتينه {mat.protein}%)
                            </li>
                          ));
                        } else if (suggestion.type === 'decrease') {
                          return suggestion.materials.map((mat: any, midx: number) => (
                            <li key={`dec-${idx}-${midx}`}>
                              تقليل كمية <strong>{mat.name}</strong> (بروتينه {mat.protein}%)
                            </li>
                          ));
                        } else if (suggestion.type === 'add_low') {
                          return suggestion.materials.map((mat: any, midx: number) => (
                            <li key={`add-${idx}-${midx}`}>
                              زيادة كمية <strong>{mat.name}</strong> (بروتينه {mat.protein}%)
                            </li>
                          ));
                        } else {
                          return <li key={`gen-${idx}`}>{suggestion.message}</li>;
                        }
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedFormulationPage;