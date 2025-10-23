import React from 'react';
import { Clock, Star, ChevronRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DailyOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  originalPrice: number;
  finalPrice: number;
  timeLeft: string;
  rating: number;
  partner: string;
}

export default function DailyOffers(): React.ReactElement {
  const navigate = useNavigate();

  const dailyOffers: DailyOffer[] = [
    {
      id: 1,
      title: 'Smartphone Samsung Galaxy',
      description: 'Galaxy A54 5G 128GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
      discount: '25%',
      originalPrice: 1299.90,
      finalPrice: 974.93,
      timeLeft: '2h 15m',
      rating: 4.8,
      partner: 'Amazon BR'
    },
    {
      id: 2,
      title: 'Curso de Programação',
      description: 'React + TypeScript Completo',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop',
      discount: '40%',
      originalPrice: 299.90,
      finalPrice: 179.94,
      timeLeft: '5h 30m',
      rating: 4.9,
      partner: 'Udemy'
    },
    {
      id: 3,
      title: 'Jantar Romântico',
      description: 'Menu especial para 2 pessoas',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop',
      discount: '30%',
      originalPrice: 180.00,
      finalPrice: 126.00,
      timeLeft: '1h 45m',
      rating: 4.7,
      partner: 'Restaurante Sabor'
    },
    {
      id: 4,
      title: 'Spa Day Completo',
      description: 'Massagem + Tratamento Facial',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=200&fit=crop',
      discount: '35%',
      originalPrice: 350.00,
      finalPrice: 227.50,
      timeLeft: '3h 20m',
      rating: 4.8,
      partner: 'Spa Relax'
    }
  ];

  const handleOfferClick = (offerId: number) => {
    navigate(`/offers/${offerId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">Ofertas do Dia</h2>
          <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-medium">Limitado</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/offers')}
          className="text-brand-blue text-sm font-medium hover:underline flex items-center"
        >
          Ver todas
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dailyOffers.map((offer) => (
          <button
            key={offer.id}
            onClick={() => handleOfferClick(offer.id)}
            className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="relative mb-3">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-32 rounded-xl object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>{offer.discount}</span>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{offer.timeLeft}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{offer.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{offer.description}</p>
                <p className="text-xs text-gray-500">{offer.partner}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{offer.rating}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 line-through">R$ {offer.originalPrice.toFixed(2)}</span>
                    <span className="text-sm font-bold text-brand-blue">R$ {offer.finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
