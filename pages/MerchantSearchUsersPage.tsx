import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  cashbackBalance: number;
  totalEarned: number;
  referralCode: string;
  joinedAt: string;
  lastLogin: string;
  isCustomer: boolean;
  totalPurchases?: number;
}

const MerchantSearchUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AppUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockUsers: AppUser[] = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      isActive: true,
      cashbackBalance: 125.50,
      totalEarned: 1250.00,
      referralCode: 'MARIA2025',
      joinedAt: '2024-01-01',
      lastLogin: '2024-01-20',
      isCustomer: true,
      totalPurchases: 1250.50
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      isActive: true,
      cashbackBalance: 89.30,
      totalEarned: 893.00,
      referralCode: 'JOAO2025',
      joinedAt: '2024-01-05',
      lastLogin: '2024-01-18',
      isCustomer: true,
      totalPurchases: 890.30
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      isActive: false,
      cashbackBalance: 0,
      totalEarned: 0,
      referralCode: 'ANA2025',
      joinedAt: '2024-01-10',
      lastLogin: '2024-01-15',
      isCustomer: false,
      totalPurchases: 0
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      phone: '(11) 66666-6666',
      isActive: true,
      cashbackBalance: 45.20,
      totalEarned: 452.00,
      referralCode: 'PEDRO2025',
      joinedAt: '2024-01-12',
      lastLogin: '2024-01-19',
      isCustomer: true,
      totalPurchases: 450.20
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Simular busca na API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consultar Usuários</h1>
                <p className="text-sm text-gray-600">Busque usuários cadastrados no app</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Busca */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Buscar Usuário</h3>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nome, email, telefone ou código de referência"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchTerm.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Buscar
                </>
              )}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Você pode buscar por:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Nome completo do usuário</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Código de referência</li>
            </ul>
          </div>
        </div>

        {/* Resultados da Busca */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Resultados da Busca ({searchResults.length})
              </h3>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum usuário encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tente buscar com outros termos ou verifique se o usuário está cadastrado no app.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((user) => (
                  <div key={user.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {getInitials(user.name)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-medium text-gray-900">
                              {user.name}
                            </h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                            {user.isCustomer && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Cliente
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <EnvelopeIcon className="h-4 w-4 mr-1" />
                              {user.email}
                            </span>
                            <span className="flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-1" />
                              {user.phone}
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium">Ref:</span> {user.referralCode}
                            </span>
                          </div>
                          
                          <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              <span className="font-medium text-gray-900">
                                {formatCurrency(user.cashbackBalance)}
                              </span>
                              <span className="ml-1">saldo</span>
                            </span>
                            <span className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              <span className="font-medium text-green-600">
                                {formatCurrency(user.totalEarned)}
                              </span>
                              <span className="ml-1">total ganho</span>
                            </span>
                            {user.isCustomer && user.totalPurchases && (
                              <span className="flex items-center">
                                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium text-purple-600">
                                  {formatCurrency(user.totalPurchases)}
                                </span>
                                <span className="ml-1">compras</span>
                              </span>
                            )}
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Cadastro: {formatDate(user.joinedAt)}
                            </span>
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Último login: {formatDate(user.lastLogin)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {user.isActive ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm text-gray-500">
                            {user.isActive ? 'Conta ativa' : 'Conta inativa'}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => navigate(`/merchant/users/${user.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Ver detalhes do usuário"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Sobre a Consulta de Usuários</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• Esta ferramenta permite buscar usuários cadastrados no aplicativo NexPrev</p>
            <p>• Você pode verificar se uma pessoa já possui conta no app</p>
            <p>• Informações como saldo de cashback e histórico de compras são exibidos</p>
            <p>• Usuários marcados como "Cliente" já realizaram compras em sua loja</p>
            <p>• Use esta funcionalidade para verificar elegibilidade para promoções especiais</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSearchUsersPage;
