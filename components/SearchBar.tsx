
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar(): React.ReactElement {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Busque por lojas e produtos"
        className="w-full py-3 pl-4 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
}
