import React from 'react';
import { User, Mail, Phone, Settings, Bell, LogOut, ArrowLeft, Edit3, Shield, Users, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function ProfilePage(): React.ReactElement {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useScrollToTop();

  const menuItems = [
    { icon: Bell, title: 'Notificações', description: 'Gerenciar alertas e notificações' },
    { icon: Shield, title: 'Privacidade', description: 'Configurações de privacidade' },
    { icon: Settings, title: 'Configurações', description: 'Preferências gerais' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* User Info */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phone}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Edit3 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Referral Program Card */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Programa de Indicação</h3>
            <p className="text-sm opacity-90">Ganhe R$ 10,00 por cada amigo indicado</p>
          </div>
          <Gift className="w-8 h-8 opacity-80" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Seu código:</p>
            <p className="text-xl font-bold">{user?.referralCode}</p>
          </div>
          <button 
            onClick={() => navigate('/referral')}
            className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Configurações</h2>
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-blue hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 bg-brand-light-blue rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Sair da Conta</span>
        </button>
      </div>
    </div>
  );
}
