import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cashbackBalance: number;
  totalEarned: number;
  referralCode: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nexprev_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const generateReferralCode = (name: string): string => {
    const cleanName = name.replace(/\s+/g, '').toUpperCase();
    const year = new Date().getFullYear();
    return `${cleanName}${year}`;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    if (email === 'teste@teste.com' && password === '1') {
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: 'teste@teste.com',
        phone: '(11) 99999-9999',
        cashbackBalance: 245.80,
        totalEarned: 1234.56,
        referralCode: 'JOAO2025'
      };
      
      setUser(mockUser);
      localStorage.setItem('nexprev_user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      cashbackBalance: 0,
      totalEarned: 0,
      referralCode: generateReferralCode(userData.name)
    };
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(newUser);
    localStorage.setItem('nexprev_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexprev_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};