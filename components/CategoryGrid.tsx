import React from 'react';
import { Heart, Pill, Utensils, Gamepad2, GraduationCap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  count: number;
}

export default function CategoryGrid(): React.ReactElement {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: 'saude',
      name: 'Saúde',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      count: 25
    },
    {
      id: 'farmacia',
      name: 'Farmácia',
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: 18
    },
    {
      id: 'alimentacao',
      name: 'Alimentação',
      icon: Utensils,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      count: 42
    },
    {
      id: 'lazer',
      name: 'Lazer',
      icon: Gamepad2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: 15
    },
    {
      id: 'educacao',
      name: 'Educação',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: 8
    },
    {
      id: 'beleza',
      name: 'Beleza',
      icon: Sparkles,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      count: 32
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/partners?category=${categoryId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Categorias</h2>
        <button 
          onClick={() => navigate('/partners')}
          className="text-brand-blue text-sm font-medium hover:underline"
        >
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`${category.bgColor} rounded-2xl p-4 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count} parceiros</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
