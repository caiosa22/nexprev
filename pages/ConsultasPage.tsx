import React from 'react';
import { Search, FileText, Car, Building, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ConsultasPage(): React.ReactElement {
  const navigate = useNavigate();

  const consultas = [
    { 
      icon: FileText, 
      title: 'CPF', 
      description: 'Consulta de CPF',
      color: 'bg-blue-500',
      price: 'R$ 2,90'
    },
    { 
      icon: Car, 
      title: 'Veículos', 
      description: 'Consulta de veículos',
      color: 'bg-green-500',
      price: 'R$ 5,90'
    },
    { 
      icon: Building, 
      title: 'CNPJ', 
      description: 'Consulta de CNPJ',
      color: 'bg-purple-500',
      price: 'R$ 3,90'
    },
    { 
      icon: Search, 
      title: 'Outras Consultas', 
      description: 'Mais opções disponíveis',
      color: 'bg-orange-500',
      price: 'A partir de R$ 1,90'
    },
  ];

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
        <h1 className="text-xl font-bold text-gray-800">Consultas</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar consultas..."
          className="w-full py-3 pl-4 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
          <Search className="w-5 h-5" />
        </div>
      </div>

      {/* Consultas Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Tipos de consulta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {consultas.map((consulta, index) => {
            const Icon = consulta.icon;
            return (
              <button
                key={index}
                className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all duration-200 text-left"
              >
                <div className={`w-12 h-12 ${consulta.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{consulta.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{consulta.description}</p>
                <p className="text-sm font-semibold text-brand-blue">{consulta.price}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Consultas */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Consultas recentes</h2>
        <div className="space-y-3">
          {[
            { type: 'CPF', document: '123.456.789-00', date: 'Hoje', status: 'Concluída' },
            { type: 'Veículo', document: 'ABC-1234', date: 'Ontem', status: 'Concluída' },
            { type: 'CNPJ', document: '12.345.678/0001-90', date: '3 dias atrás', status: 'Concluída' },
          ].map((consulta, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-light-blue rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{consulta.type}</p>
                  <p className="text-sm text-gray-600">{consulta.document}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{consulta.date}</p>
                <p className="text-sm text-green-600">{consulta.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
