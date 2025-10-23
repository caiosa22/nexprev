
import React, { useState } from 'react';
import type { Offer } from '../types';
import Modal from './Modal';
import { ExternalLink, Clock, Tag } from 'lucide-react';

const offers: Offer[] = [
    {
        id: 1,
        imageUrl: 'https://picsum.photos/seed/offer1/400/300',
        title: 'Compre com 100% de cashback',
        description: 'na Amazon BR',
    },
    {
        id: 2,
        imageUrl: 'https://picsum.photos/seed/offer2/400/300',
        title: 'Produtos selecionados com super cashback',
        description: 'em Americanas',
    },
    {
        id: 3,
        imageUrl: 'https://picsum.photos/seed/offer3/400/300',
        title: 'Eletrônicos com até 50% OFF',
        description: 'e 10% de volta no Magalu',
    },
];

const OfferCard = ({ offer }: { offer: Offer }): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex-shrink-0 w-64 bg-brand-light-blue rounded-2xl overflow-hidden shadow-sm relative hover:shadow-md transition-shadow duration-200"
      >
        <img src={offer.imageUrl} alt={offer.title} className="w-full h-24 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-brand-blue">{offer.title}</h3>
          <p className="text-sm text-gray-700">{offer.description}</p>
        </div>
        <div className="absolute top-2 right-2 bg-brand-orange text-white text-sm font-bold w-16 h-16 rounded-full flex items-center justify-center -rotate-12">
          100%
        </div>
      </button>

      {/* Offer Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Detalhes da Oferta"
        size="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={offer.imageUrl} 
              alt={offer.title} 
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-full font-bold">
              100% Cashback
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800">{offer.title}</h2>
            <p className="text-gray-600">{offer.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Cashback</p>
                    <p className="font-bold text-green-600">100%</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Válido até</p>
                    <p className="font-bold text-blue-600">31/12/24</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Como funciona:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Acesse a loja através do nosso link</li>
                <li>• Faça sua compra normalmente</li>
                <li>• Receba 100% do valor em cashback</li>
                <li>• Saque quando quiser</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Termos e condições:</h3>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Oferta válida apenas para produtos selecionados</li>
                <li>• Cashback creditado em até 48 horas</li>
                <li>• Valor mínimo de compra: R$ 50,00</li>
                <li>• Não cumulativo com outras promoções</li>
              </ul>
            </div>
            
            <button className="w-full bg-brand-blue text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Ir para a Loja</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default function CashbackOffers(): React.ReactElement {
    return (
        <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">100% de cashback</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {offers.map(offer => (
                    <div key={offer.id}>
                        <OfferCard offer={offer} />
                    </div>
                ))}
            </div>
        </section>
    );
}
