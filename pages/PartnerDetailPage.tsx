import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, Heart, Share2, ChevronLeft, ChevronRight, MessageCircle, Instagram } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PartnerDetailPage(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - em uma aplicação real, isso viria de uma API
  const partner = {
    id: 1,
    name: 'Farmácia São Paulo',
    category: 'Farmácia',
    logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    ],
    discount: '8%',
    rating: 4.8,
    reviews: 124,
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo - SP',
    phone: '(11) 99999-9999',
    hours: 'Seg-Sex: 8h às 20h\nSáb: 8h às 18h\nDom: Fechado',
    benefits: [
      'Cashback de 8% em medicamentos',
      'Desconto de 5% em produtos de beleza',
      'Frete grátis para compras acima de R$ 50',
      'Programa de fidelidade com pontos'
    ],
    description: 'Farmácia tradicional com mais de 20 anos de experiência, oferecendo medicamentos, produtos de beleza e cuidados pessoais com os melhores preços da região.'
  };

  const reviews = [
    { id: 1, name: 'Maria Silva', rating: 5, comment: 'Excelente atendimento e preços justos!', date: '2 dias atrás' },
    { id: 2, name: 'João Santos', rating: 4, comment: 'Produtos de qualidade e entrega rápida.', date: '1 semana atrás' },
    { id: 3, name: 'Ana Costa', rating: 5, comment: 'Farmácia confiável, sempre encontro o que preciso.', date: '2 semanas atrás' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % partner.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + partner.images.length) % partner.images.length);
  };

  const handleResgate = () => {
    alert('Redirecionando para resgate da oferta...');
  };

  const handleShare = () => {
    const message = `Confira esta oferta incrível na ${partner.name}! ${partner.discount} de cashback.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/partners')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">{partner.name}</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-full transition-colors ${
              isFavorited ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="h-64 bg-gray-200 relative overflow-hidden">
          <img 
            src={partner.images[currentImage]} 
            alt={partner.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {partner.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Partner Info */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{partner.name}</h2>
                <p className="text-gray-600">{partner.category}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{partner.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({partner.reviews} avaliações)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-brand-blue text-white px-4 py-2 rounded-xl">
                <p className="text-2xl font-bold">{partner.discount}</p>
                <p className="text-xs opacity-90">cashback</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefícios</h3>
          <div className="space-y-3">
            {partner.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{partner.address}</p>
                <p className="text-gray-600">{partner.city}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{partner.phone}</span>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Horário de Funcionamento</p>
                <pre className="text-gray-600 text-sm whitespace-pre-line">{partner.hours}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Avaliações</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">{review.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Localização</h3>
          <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Mapa de localização</p>
              <p className="text-sm text-gray-400">Integração com Google Maps</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button 
            onClick={handleResgate}
            className="w-full bg-gradient-to-r from-brand-blue to-brand-orange text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Resgatar Oferta
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 py-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">WhatsApp</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors">
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="text-pink-700 font-medium">Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
