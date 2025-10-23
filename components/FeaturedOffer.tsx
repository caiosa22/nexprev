
import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function FeaturedOffer(): React.ReactElement {
  return (
    <div className="bg-brand-blue text-white p-4 rounded-2xl flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white rounded-lg">
           <img src="https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png" alt="Amazon Logo" className="h-6" />
        </div>
        <div>
          <p className="font-bold">Amazon BR até</p>
          <p className="text-2xl font-extrabold">5% cashback</p>
          <p className="text-xs opacity-80">Confira categorias elegíveis com cashback</p>
        </div>
      </div>
      <div className="p-1 bg-white/20 rounded-full">
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  );
}
