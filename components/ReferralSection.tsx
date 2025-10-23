import React, { useState } from 'react';
import { Users, Gift, Share2, MessageCircle, Instagram, Copy, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ReferralOffer {
  id: number;
  title: string;
  description: string;
  bonus: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function ReferralSection(): React.ReactElement {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralOffers: ReferralOffer[] = [
    {
      id: 1,
      title: 'Indique um Amigo',
      description: 'Ganhe R$ 10,00 por cada cadastro',
      bonus: 'R$ 10',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Compartilhe nas Redes',
      description: 'Ganhe pontos extras por compartilhamento',
      bonus: '+50 pts',
      icon: Share2,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Programa VIP',
      description: 'Seja um indicador top e ganhe prêmios',
      bonus: 'Prêmios',
      icon: Trophy,
      color: 'bg-purple-500'
    }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `Olá! Descubra o NexPrev e ganhe cashback em suas compras! Use meu código: ${user?.referralCode}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const ReferralCard = ({ offer }: { offer: ReferralOffer }): React.ReactElement => {
    const Icon = offer.icon;
    
    return (
      <button
        onClick={() => navigate('/referral')}
        className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm relative hover:shadow-md transition-all duration-200 border border-gray-200"
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-12 h-12 ${offer.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-left">{offer.title}</h3>
              <p className="text-sm text-gray-600 text-left">{offer.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-brand-blue to-brand-orange text-white px-3 py-1 rounded-full text-sm font-bold">
              {offer.bonus}
            </div>
            <div className="flex items-center space-x-1 text-brand-blue">
              <span className="text-sm font-medium">Ver detalhes</span>
              <Star className="w-4 h-4" />
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Programa de Indicação</h2>
        <button 
          onClick={() => navigate('/referral')}
          className="text-brand-blue text-sm font-medium hover:underline"
        >
          Ver todos
        </button>
      </div>
      
      {/* Referral Code Card */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-4 text-white mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Seu código de indicação</p>
            <p className="text-xl font-bold">{user?.referralCode}</p>
          </div>
          <button 
            onClick={copyReferralCode}
            className="bg-white bg-opacity-20 px-3 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all flex items-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* Referral Offers */}
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {referralOffers.map(offer => (
          <ReferralCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Quick Share Buttons */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Compartilhar</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={shareViaWhatsApp}
            className="flex flex-col items-center space-y-2 py-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-green-600" />
            <span className="text-green-700 text-xs font-medium">WhatsApp</span>
          </button>
          <button className="flex flex-col items-center space-y-2 py-3 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors">
            <Instagram className="w-6 h-6 text-pink-600" />
            <span className="text-pink-700 text-xs font-medium">Instagram</span>
          </button>
        </div>
      </div>
    </section>
  );
}
