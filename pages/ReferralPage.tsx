import React, { useState } from 'react';
import { ArrowLeft, Copy, Share2, Users, Trophy, Gift, MessageCircle, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function ReferralPage(): React.ReactElement {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  useScrollToTop();

  const referrals = [
    { id: 1, name: 'Maria Silva', date: '15/12/2024', status: 'Ativo', bonus: 10.00 },
    { id: 2, name: 'João Santos', date: '10/12/2024', status: 'Ativo', bonus: 10.00 },
    { id: 3, name: 'Ana Costa', date: '05/12/2024', status: 'Pendente', bonus: 0.00 },
    { id: 4, name: 'Pedro Lima', date: '01/12/2024', status: 'Ativo', bonus: 10.00 },
  ];

  const ranking = [
    { position: 1, name: 'João Silva', referrals: 12, totalBonus: 120.00 },
    { position: 2, name: 'Maria Santos', referrals: 10, totalBonus: 100.00 },
    { position: 3, name: 'Ana Costa', referrals: 8, totalBonus: 80.00 },
    { position: 4, name: 'Pedro Lima', referrals: 6, totalBonus: 60.00 },
    { position: 5, name: 'Carlos Souza', referrals: 5, totalBonus: 50.00 },
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

  const shareViaInstagram = () => {
    // Simular compartilhamento no Instagram
    alert('Compartilhamento no Instagram seria implementado aqui');
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'text-green-600 bg-green-50';
      case 'Pendente': return 'text-yellow-600 bg-yellow-50';
      case 'Cancelado': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="px-4 space-y-6">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Programa de Indicação</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* Referral Code Card */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <Gift className="w-12 h-12 mx-auto mb-3 opacity-80" />
          <h2 className="text-xl font-bold mb-2">Seu Código de Indicação</h2>
          <p className="text-sm opacity-90 mb-4">Compartilhe e ganhe R$ 10,00 por cada amigo que se cadastrar</p>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Código:</p>
              <p className="text-2xl font-bold">{user?.referralCode}</p>
            </div>
            <button 
              onClick={copyReferralCode}
              className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm opacity-90">Total ganho com indicações:</p>
          <p className="text-2xl font-bold">R$ 30,00</p>
        </div>
      </div>

      {/* Share Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Compartilhar</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={shareViaWhatsApp}
            className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-center"
          >
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">WhatsApp</p>
          </button>
          <button 
            onClick={shareViaInstagram}
            className="p-4 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors text-center"
          >
            <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-pink-700">Instagram</p>
          </button>
        </div>
      </div>

      {/* Ranking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Ranking de Indicadores</h3>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="space-y-3">
          {ranking.map((person, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  person.position === 1 ? 'bg-yellow-100 text-yellow-600' :
                  person.position === 2 ? 'bg-gray-100 text-gray-600' :
                  person.position === 3 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {person.position}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{person.name}</p>
                  <p className="text-sm text-gray-600">{person.referrals} indicações</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">R$ {person.totalBonus.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Histórico de Indicações</h3>
          <Users className="w-5 h-5 text-brand-blue" />
        </div>
        <div className="space-y-3">
          {referrals.map((referral) => (
            <div key={referral.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-light-blue rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{referral.name}</p>
                  <p className="text-sm text-gray-600">{referral.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                  {referral.status}
                </span>
                <p className="text-sm font-semibold text-green-600 mt-1">
                  R$ {referral.bonus.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Como Funciona</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <p className="text-sm text-gray-600">Compartilhe seu código com amigos</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <p className="text-sm text-gray-600">Eles se cadastram usando seu código</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <p className="text-sm text-gray-600">Você ganha R$ 10,00 por cada cadastro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
