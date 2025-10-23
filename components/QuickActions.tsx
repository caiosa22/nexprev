
import React, { useState } from 'react';
import { Users, FileText, ShoppingBag, Star, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

interface ActionItem {
  icon: React.ComponentType<any>;
  label: string;
  tag?: {
    text: string;
    color: string;
  };
}

const actions: ActionItem[] = [
  { icon: Users, label: 'Indicação', tag: { text: 'NOVO', color: 'bg-red-500' } },
  { icon: FileText, label: 'Nota Fiscal' },
  { icon: ShoppingBag, label: 'Produtos' },
  { icon: Star, label: 'Missões' },
  { icon: MoreHorizontal, label: 'Ver mais' },
];

const ActionButton = ({ item }: { item: ActionItem }): React.ReactElement => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = item.icon;

  const handleClick = () => {
    switch (item.label) {
      case 'Indicação':
        navigate('/referral');
        break;
      case 'Nota Fiscal':
        navigate('/transactions');
        break;
      case 'Produtos':
        navigate('/partners');
        break;
      case 'Missões':
        setIsModalOpen(true);
        break;
      case 'Ver mais':
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="relative flex flex-col items-center space-y-2 text-center hover:scale-105 transition-transform duration-200"
      >
        <div className="relative flex items-center justify-center w-16 h-16 bg-brand-light-blue rounded-2xl hover:bg-blue-100 transition-colors">
          <Icon className="w-8 h-8 text-brand-blue" />
          {item.tag && (
            <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold text-white ${item.tag.color} rounded-full`}>
              {item.tag.text}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-700">{item.label}</span>
      </button>

      {/* Modal for specific actions */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={item.label}
      >
        <div className="space-y-4">
          
          {item.label === 'Missões' && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white">
                <Star className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Missões Disponíveis</h3>
                <p className="text-sm opacity-90">Complete missões e ganhe recompensas</p>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Primeira Compra', reward: 'R$ 5,00', progress: '0/1' },
                  { title: 'Compartilhar App', reward: 'R$ 2,00', progress: '0/1' },
                  { title: 'Avaliar App', reward: 'R$ 3,00', progress: '0/1' },
                ].map((mission, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{mission.title}</p>
                        <p className="text-sm text-gray-600">{mission.progress}</p>
                      </div>
                      <span className="text-green-600 font-bold">{mission.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {item.label === 'Ver mais' && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                <MoreHorizontal className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Mais Funcionalidades</h3>
                <p className="text-sm opacity-90">Descubra todas as opções disponíveis</p>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Histórico de Transações', description: 'Veja todas suas compras' },
                  { title: 'Cupons de Desconto', description: 'Economize ainda mais' },
                  { title: 'Programa de Fidelidade', description: 'Ganhe pontos extras' },
                ].map((feature, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">{feature.title}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default function QuickActions(): React.ReactElement {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {actions.map((action, index) => (
        <div key={index}>
          <ActionButton item={action} />
        </div>
      ))}
    </div>
  );
}
