import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Store, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function TransactionsPage(): React.ReactElement {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  useScrollToTop();

  const transactions = [
    { 
      id: 1,
      store: 'Amazon BR', 
      product: 'Smartphone Samsung Galaxy', 
      date: 'Hoje', 
      originalValue: 899.90,
      discount: 45.00,
      status: 'concluída',
      logo: 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png'
    },
    { 
      id: 2,
      store: 'Magazine Luiza', 
      product: 'Notebook Dell Inspiron', 
      date: 'Ontem', 
      originalValue: 2499.00,
      discount: 125.00,
      status: 'concluída',
      logo: 'https://logodownload.org/wp-content/uploads/2014/04/magazine-luiza-logo-0.png'
    },
    { 
      id: 3,
      store: 'Netflix', 
      product: 'Assinatura Premium', 
      date: '2 dias atrás', 
      originalValue: 32.90,
      discount: 1.65,
      status: 'concluída',
      logo: 'https://logodownload.org/wp-content/uploads/2014/04/netflix-logo-0.png'
    },
    { 
      id: 4,
      store: 'Spotify', 
      product: 'Assinatura Individual', 
      date: '3 dias atrás', 
      originalValue: 19.90,
      discount: 0.60,
      status: 'pendente',
      logo: 'https://logodownload.org/wp-content/uploads/2014/04/spotify-logo-0.png'
    },
    { 
      id: 5,
      store: 'Uber', 
      product: 'Corrida Centro - Zona Sul', 
      date: '1 semana atrás', 
      originalValue: 25.50,
      discount: 0.77,
      status: 'concluída',
      logo: 'https://logodownload.org/wp-content/uploads/2014/04/uber-logo-0.png'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'completed') return matchesSearch && transaction.status === 'concluída';
    if (selectedFilter === 'pending') return matchesSearch && transaction.status === 'pendente';
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluída': return 'text-green-600 bg-green-50';
      case 'pendente': return 'text-yellow-600 bg-yellow-50';
      case 'cancelada': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluída': return 'Concluída';
      case 'pendente': return 'Pendente';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

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
        <h1 className="text-xl font-bold text-gray-800">Transações</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por loja ou produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-4 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'completed', label: 'Concluídas' },
            { key: 'pending', label: 'Pendentes' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter.key 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredTransactions.length} transação{filteredTransactions.length !== 1 ? 'ões' : ''}
          </h2>
          <button className="flex items-center space-x-1 text-brand-blue">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Mais filtros</span>
          </button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-blue hover:shadow-sm transition-all duration-200">
              <div className="flex items-start space-x-3">
                <img 
                  src={transaction.logo} 
                  alt={transaction.store}
                  className="w-12 h-12 rounded-lg object-contain"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{transaction.store}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{transaction.product}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{transaction.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>R$ {transaction.originalValue.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        +R$ {transaction.discount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Cashback</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma transação encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca</p>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-orange p-4 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Total em Cashback</h3>
            <p className="text-sm opacity-90">Este mês</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">R$ 172,02</p>
            <p className="text-sm opacity-90">+12% vs mês anterior</p>
          </div>
        </div>
      </div>
    </div>
  );
}
