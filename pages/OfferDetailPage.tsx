import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Tag, Star, MapPin, Phone, Share2, MessageCircle, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OfferDetailPage(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - em uma aplicação real, isso viria de uma API
  const offer = {
    id: 1,
    title: 'Smartphone Samsung Galaxy',
    description: 'Galaxy A54 5G 128GB - O smartphone perfeito para quem busca tecnologia e qualidade',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
    ],
    discount: '25%',
    originalPrice: 1299.90,
    finalPrice: 974.93,
    savings: 324.97,
    timeLeft: '2h 15m',
    partner: 'Amazon BR',
    partnerLogo: 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png',
    rating: 4.8,
    reviews: 1247,
    category: 'Eletrônicos',
    features: [
      'Tela Super AMOLED de 6.4"',
      'Câmera tripla de 50MP',
      'Bateria de 5000mAh',
      'Processador Exynos 1380',
      '128GB de armazenamento',
      '5G Ready'
    ],
    terms: [
      'Oferta válida até o fim do estoque',
      'Cashback creditado em até 24h',
      'Não cumulativo com outras promoções',
      'Frete grátis para todo o Brasil'
    ],
    address: 'Centro de Distribuição Amazon',
    city: 'São Paulo - SP',
    phone: '(11) 3003-4070'
  };

  const reviews = [
    { id: 1, name: 'Carlos Silva', rating: 5, comment: 'Excelente produto, entrega rápida e preço justo!', date: '1 dia atrás' },
    { id: 2, name: 'Ana Santos', rating: 4, comment: 'Smartphone muito bom, câmera excelente.', date: '3 dias atrás' },
    { id: 3, name: 'Pedro Costa', rating: 5, comment: 'Recomendo, produto de qualidade.', date: '1 semana atrás' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % offer.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + offer.images.length) % offer.images.length);
  };

  const handleResgate = () => {
    alert('Redirecionando para resgate da oferta...');
  };

  const handleShare = () => {
    const message = `Confira esta oferta incrível! ${offer.title} com ${offer.discount} de desconto na ${offer.partner}!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Oferta do Dia</h1>
        <button 
          onClick={handleShare}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="h-64 bg-gray-200 relative overflow-hidden">
          <img 
            src={offer.images[currentImage]} 
            alt={offer.title}
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
        
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
          <Tag className="w-4 h-4" />
          <span>{offer.discount}</span>
        </div>
        
        {/* Time Left */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{offer.timeLeft}</span>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {offer.images.map((_, index) => (
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

      {/* Offer Info */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={offer.partnerLogo} 
                alt={offer.partner}
                className="w-10 h-10 rounded-lg object-contain"
              />
              <div>
                <p className="font-medium text-gray-800">{offer.partner}</p>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{offer.rating} ({offer.reviews})</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{offer.category}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg text-gray-500 line-through">R$ {offer.originalPrice.toFixed(2)}</span>
                <span className="text-2xl font-bold text-brand-blue">R$ {offer.finalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">Você economiza R$ {offer.savings.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <div className="bg-brand-blue text-white px-4 py-2 rounded-xl">
                <p className="text-lg font-bold">{offer.discount}</p>
                <p className="text-xs opacity-90">desconto</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Características</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {offer.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Termos e Condições</h3>
          <div className="space-y-2">
            {offer.terms.map((term, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                <span className="text-gray-600 text-sm">{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Info */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações da Loja</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{offer.address}</p>
                <p className="text-gray-600">{offer.city}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{offer.phone}</span>
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

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button 
            onClick={handleResgate}
            className="w-full bg-gradient-to-r from-brand-blue to-brand-orange text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Resgatar Oferta - R$ {offer.finalPrice.toFixed(2)}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleShare}
              className="flex flex-col items-center space-y-1 py-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 text-xs font-medium">WhatsApp</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-3 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors">
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="text-pink-700 text-xs font-medium">Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
