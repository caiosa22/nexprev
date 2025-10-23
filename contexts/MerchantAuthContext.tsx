import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Merchant } from '../types';

interface MerchantAuthContextType {
  merchant: Merchant | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (merchantData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const MerchantAuthContext = createContext<MerchantAuthContextType | undefined>(undefined);

export const useMerchantAuth = () => {
  const context = useContext(MerchantAuthContext);
  if (context === undefined) {
    throw new Error('useMerchantAuth must be used within a MerchantAuthProvider');
  }
  return context;
};

interface MerchantAuthProviderProps {
  children: ReactNode;
}

export const MerchantAuthProvider: React.FC<MerchantAuthProviderProps> = ({ children }) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedMerchant = localStorage.getItem('nexprev_merchant');
    if (savedMerchant) {
      setMerchant(JSON.parse(savedMerchant));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock login para demonstração
    if (email === 'teste1@teste.com' && password === '123') {
      const mockMerchant: Merchant = {
        id: 'merchant_1',
        name: 'João Silva',
        email: 'lojista@teste.com',
        phone: '(11) 99999-9999',
        businessName: 'Loja do João',
        cnpj: '12.345.678/0001-90',
        address: 'Rua das Flores, 123 - São Paulo/SP',
        category: 'Varejo',
        description: 'Loja especializada em produtos diversos',
        logoUrl: '',
        isActive: true,
        createdAt: '2024-01-01'
      };
      
      setMerchant(mockMerchant);
      localStorage.setItem('nexprev_merchant', JSON.stringify(mockMerchant));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (merchantData: any): Promise<boolean> => {
    setLoading(true);
    
    const newMerchant: Merchant = {
      id: `merchant_${Date.now()}`,
      name: merchantData.name,
      email: merchantData.email,
      phone: merchantData.phone,
      businessName: merchantData.businessName,
      cnpj: merchantData.cnpj,
      address: merchantData.address,
      category: merchantData.category,
      description: merchantData.description,
      logoUrl: merchantData.logoUrl,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMerchant(newMerchant);
    localStorage.setItem('nexprev_merchant', JSON.stringify(newMerchant));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setMerchant(null);
    localStorage.removeItem('nexprev_merchant');
  };

  const value: MerchantAuthContextType = {
    merchant,
    isAuthenticated: !!merchant,
    login,
    register,
    logout,
    loading
  };

  return (
    <MerchantAuthContext.Provider value={value}>
      {children}
    </MerchantAuthContext.Provider>
  );
};
