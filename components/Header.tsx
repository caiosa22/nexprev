import React, { useState } from 'react';
import { Gift, Bell, User, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';

const LOGO_DATA_URL = "https://i.postimg.cc/LsHbp5GG/NEXPREV-LETRA-PRETA-1.png";

export const Header = (): React.ReactElement => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Cashback disponível!', message: 'Você tem R$ 45,80 para sacar', time: '2 min atrás' },
    { id: 2, title: 'Nova oferta', message: 'Amazon BR com 5% de cashback', time: '1 hora atrás' },
    { id: 3, title: 'Pagamento aprovado', message: 'Netflix - R$ 32,90', time: '3 horas atrás' },
  ];

  return (
    <>
      <header className="px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        {/* Logo and Icons Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={LOGO_DATA_URL} alt="NexPrev Logo" className="h-10" />
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <button 
              onClick={() => setIsGiftModalOpen(true)}
              className="relative hover:text-brand-blue transition-colors"
            >
              <Gift className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
              </span>
            </button>
            <button 
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative hover:text-brand-blue transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="hover:text-brand-blue transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Gift Modal */}
      <Modal 
        isOpen={isGiftModalOpen} 
        onClose={() => setIsGiftModalOpen(false)}
        title="Presentes e Ofertas"
      >
        <div className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-brand-blue to-brand-orange rounded-xl text-white">
            <Gift className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Presente Especial!</h3>
            <p className="text-sm opacity-90">Você ganhou R$ 10,00 de bônus!</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Ofertas disponíveis:</h4>
            {[
              { title: 'Amazon BR', discount: '5% cashback', valid: 'Válido até 31/12' },
              { title: 'Netflix', discount: '2% cashback', valid: 'Válido até 15/01' },
              { title: 'Spotify', discount: '1% cashback', valid: 'Válido até 20/01' },
            ].map((offer, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{offer.title}</p>
                    <p className="text-sm text-gray-600">{offer.valid}</p>
                  </div>
                  <span className="text-brand-blue font-bold">{offer.discount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Notification Modal */}
      <Modal 
        isOpen={isNotificationModalOpen} 
        onClose={() => setIsNotificationModalOpen(false)}
        title="Notificações"
      >
        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-800">{notification.title}</h4>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};