import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NearbyPartner {
  id: number;
  name: string;
  logo: string;
  distance: string;
  discount: string;
  rating: number;
  category: string;
}

export default function NearbyPartners(): React.ReactElement {
  const navigate = useNavigate();

  const nearbyPartners: NearbyPartner[] = [
    {
      id: 1,
      name: 'Farmácia São Paulo',
      logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop',
      distance: '0.5 km',
      discount: '8%',
      rating: 4.8,
      category: 'Farmácia'
    },
    {
      id: 2,
      name: 'Restaurante Sabor',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
      distance: '1.2 km',
      discount: '5%',
      rating: 4.6,
      category: 'Alimentação'
    },
    {
      id: 3,
      name: 'Academia Fit',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      distance: '0.8 km',
      discount: '12%',
      rating: 4.9,
      category: 'Saúde'
    },
    {
      id: 4,
      name: 'Salão Beleza',
      logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
      distance: '1.5 km',
      discount: '6%',
      rating: 4.7,
      category: 'Beleza'
    }
  ];

  const handlePartnerClick = (partnerId: number) => {
    navigate(`/partners/${partnerId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Parceiros Próximos</h2>
        <button 
          onClick={() => navigate('/partners')}
          className="text-brand-blue text-sm font-medium hover:underline flex items-center"
        >
          Ver todos
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {nearbyPartners.map((partner, index) => (
          <button
            key={partner.id}
            onClick={() => handlePartnerClick(partner.id)}
            className={`flex-shrink-0 w-48 p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all duration-200 text-left ${
              index === 2 ? 'mr-4' : ''
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{partner.name}</h3>
                <p className="text-xs text-gray-600">{partner.category}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{partner.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{partner.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-brand-blue">{partner.discount}</span>
                <span className="text-xs text-gray-500">cashback</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
