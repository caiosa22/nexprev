import React from 'react';
import { Home, CreditCard, Receipt, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function BottomNav(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: CreditCard, label: 'Pagar', path: '/payment' },
    { icon: Receipt, label: 'Transações', path: '/transactions' },
    { icon: Users, label: 'Parceiros', path: '/partners' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label} 
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${
                isActive ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'
              }`}
            >
              <item.icon className="w-7 h-7" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}