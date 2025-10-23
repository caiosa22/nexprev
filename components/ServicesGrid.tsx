
import React, { useState } from 'react';
import { Gamepad2, Gem, Trophy, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const services: ServiceItem[] = [
  { icon: Gamepad2, labelLine1: 'Jogue e', labelLine2: 'Ganhe', tag: { text: 'BONUS', color: 'text-green-600' } },
  { icon: Gem, labelLine1: 'NexPrev', labelLine2: 'Prime', },
  { icon: Trophy, labelLine1: 'Aposta', labelLine2: 'Esportiva', tag: { text: 'ESPORTIVA', color: 'text-red-600' } },
  { icon: FileText, labelLine1: 'Planos', labelLine2: '& mais' },
];

const ServiceCard = ({ item }: { item: ServiceItem }): React.ReactElement => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = item.icon;

  const handleClick = () => {
    switch (item.labelLine1) {
      case 'Jogue e':
        setIsModalOpen(true);
        break;
      case 'NexPrev':
        setIsModalOpen(true);
        break;
      case 'Aposta':
        setIsModalOpen(true);
        break;
      case 'Planos':
        navigate('/payment');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-start text-center p-2 bg-white border border-gray-200 rounded-2xl h-32 space-y-1 hover:border-brand-blue hover:shadow-md transition-all duration-200"
      >
        <Icon className="w-8 h-8 text-gray-700" />
        <div className="flex-grow flex flex-col justify-center">
          <span className="text-xs font-semibold text-gray-800 leading-tight">{item.labelLine1}</span>
          <span className="text-xs font-semibold text-gray-800 leading-tight">{item.labelLine2}</span>
          {item.tag && (
            <span className={`text-xs font-bold ${item.tag.color} mt-1`}>{item.tag.text}</span>
          )}
        </div>
      </button>

      {/* Modal for specific services */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`${item.labelLine1} ${item.labelLine2}`}
      >
        <div className="space-y-4">
          {item.labelLine1 === 'Jogue e' && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white">
                <Gamepad2 className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Jogue e Ganhe!</h3>
                <p className="text-sm opacity-90">Transforme diversão em dinheiro</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Jogos disponíveis:</h4>
                {[
                  { name: 'Caça Níqueis', reward: 'Até R$ 50,00', status: 'Disponível' },
                  { name: 'Roleta', reward: 'Até R$ 100,00', status: 'Disponível' },
                  { name: 'Blackjack', reward: 'Até R$ 200,00', status: 'Em breve' },
                ].map((game, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{game.name}</p>
                        <p className="text-sm text-gray-600">{game.status}</p>
                      </div>
                      <span className="text-green-600 font-bold">{game.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {item.labelLine1 === 'NexPrev' && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                <Gem className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">NexPrev Prime</h3>
                <p className="text-sm opacity-90">Acesso premium com benefícios exclusivos</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Benefícios:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cashback dobrado em todas as compras</li>
                  <li>• Acesso antecipado a ofertas</li>
                  <li>• Suporte prioritário</li>
                  <li>• Sem taxas de saque</li>
                </ul>
                <div className="p-3 bg-brand-light-blue rounded-lg">
                  <p className="text-center font-bold text-brand-blue">R$ 9,90/mês</p>
                </div>
              </div>
            </>
          )}
          
          {item.labelLine1 === 'Aposta' && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white">
                <Trophy className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Aposta Esportiva</h3>
                <p className="text-sm opacity-90">Aposte nos seus times favoritos</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Esportes disponíveis:</h4>
                {[
                  { sport: 'Futebol', odds: 'Odds competitivas' },
                  { sport: 'Basquete', odds: 'Ao vivo' },
                  { sport: 'Tênis', odds: 'Pré-jogo' },
                ].map((sport, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800">{sport.sport}</p>
                      <span className="text-sm text-gray-600">{sport.odds}</span>
                    </div>
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


export default function ServicesGrid(): React.ReactElement {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Serviços NexPrev</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {services.map((service) => (
          <ServiceCard key={service.labelLine1} item={service} />
        ))}
      </div>
    </section>
  );
}
