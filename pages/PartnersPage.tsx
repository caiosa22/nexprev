import React from 'react';
import { Store, Filter, Search, ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function PartnersPage(): React.ReactElement {
  const navigate = useNavigate();
  useScrollToTop();

  const partners = [
    { name: 'Amazon BR', logo: 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png', cashback: '5%', category: 'E-commerce' },
    { name: 'Magazine Luiza', logo: 'https://logodownload.org/wp-content/uploads/2014/04/magazine-luiza-logo-0.png', cashback: '3%', category: 'E-commerce' },
    { name: 'Americanas', logo: 'https://logodownload.org/wp-content/uploads/2014/04/americanas-logo-0.png', cashback: '4%', category: 'E-commerce' },
    { name: 'Netflix', logo: 'https://logodownload.org/wp-content/uploads/2014/04/netflix-logo-0.png', cashback: '2%', category: 'Streaming' },
    { name: 'Spotify', logo: 'https://logodownload.org/wp-content/uploads/2014/04/spotify-logo-0.png', cashback: '1%', category: 'Streaming' },
    { name: 'Uber', logo: 'https://logodownload.org/wp-content/uploads/2014/04/uber-logo-0.png', cashback: '3%', category: 'Transporte' },
  ];

  const categories = ['Todos', 'E-commerce', 'Streaming', 'Transporte', 'Alimentação'];

  return (
    <div className="px-4 space-y-6">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Lojas Parceiras</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar lojas..."
            className="w-full py-3 pl-4 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Lojas disponíveis</h2>
          <button className="flex items-center space-x-1 text-brand-blue">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtrar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {partners.map((partner, index) => (
            <button
              key={index}
              className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{partner.name}</h3>
                  <p className="text-xs text-gray-600">{partner.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-brand-blue">{partner.cashback}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">4.8</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Partners */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Destaques</h2>
        <div className="bg-gradient-to-r from-brand-blue to-brand-orange p-4 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Cashback especial</h3>
              <p className="text-sm opacity-90">Até 10% de volta em lojas selecionadas</p>
            </div>
            <Store className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
