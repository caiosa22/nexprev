import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  discount: string;
  validUntil: string;
}

export default function BannerCarousel(): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners: Banner[] = [
    {
      id: 1,
      title: 'Black Friday',
      subtitle: 'Até 50% de desconto',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=200&fit=crop',
      discount: '50% OFF',
      validUntil: 'Válido até 30/11'
    },
    {
      id: 2,
      title: 'Cashback Especial',
      subtitle: '10% de volta em tudo',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      discount: '10%',
      validUntil: 'Válido até 15/12'
    },
    {
      id: 3,
      title: 'Ofertas de Natal',
      subtitle: 'Presentes com desconto',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=200&fit=crop',
      discount: '30% OFF',
      validUntil: 'Válido até 25/12'
    },
    {
      id: 4,
      title: 'Super Oferta',
      subtitle: 'Produtos selecionados',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
      discount: '20% OFF',
      validUntil: 'Válido até 31/12'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden">
      {/* Banner Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-between p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{banner.subtitle}</p>
                  <p className="text-xs opacity-75">{banner.validUntil}</p>
                </div>
                <div className="text-right">
                  <div className="bg-brand-orange text-white px-3 py-1 rounded-full text-lg font-bold mb-2">
                    {banner.discount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
