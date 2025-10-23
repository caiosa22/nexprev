import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMerchantAuth } from '../contexts/MerchantAuthContext';
import { 
  BuildingOfficeIcon,
  PlusIcon,
  CubeIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const MerchantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { merchant, logout } = useMerchantAuth();

  const handleLogout = () => {
    logout();
    navigate('/merchant/login');
  };

  const dashboardCards = [
    {
      title: 'Produtos',
      description: 'Gerencie seu catálogo',
      icon: CubeIcon,
      color: 'bg-blue-500',
      onClick: () => navigate('/merchant/products'),
      stats: '12 produtos ativos'
    },
    {
      title: 'Clientes',
      description: 'Veja seus clientes',
      icon: UsersIcon,
      color: 'bg-green-500',
      onClick: () => navigate('/merchant/customers'),
      stats: '156 clientes'
    },
    {
      title: 'Ofertas',
      description: 'Crie promoções',
      icon: TagIcon,
      color: 'bg-purple-500',
      onClick: () => navigate('/merchant/offers'),
      stats: '3 ofertas ativas'
    },
    {
      title: 'Consultar Usuários',
      description: 'Busque no app',
      icon: MagnifyingGlassIcon,
      color: 'bg-orange-500',
      onClick: () => navigate('/merchant/search-users'),
      stats: 'Buscar clientes'
    }
  ];

  const quickActions = [
    {
      title: 'Adicionar Produto',
      description: 'Cadastre um novo produto',
      icon: PlusIcon,
      onClick: () => navigate('/merchant/products/new')
    },
    {
      title: 'Criar Oferta',
      description: 'Crie uma nova promoção',
      icon: TagIcon,
      onClick: () => navigate('/merchant/offers/new')
    },
    {
      title: 'Ver Relatórios',
      description: 'Analise suas vendas',
      icon: ChartBarIcon,
      onClick: () => navigate('/merchant/reports')
    },
    {
      title: 'Configurações',
      description: 'Gerencie sua conta',
      icon: Cog6ToothIcon,
      onClick: () => navigate('/merchant/settings')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'product',
      message: 'Produto "Smartphone XYZ" foi adicionado',
      time: '2 horas atrás',
      icon: CubeIcon
    },
    {
      id: 2,
      type: 'offer',
      message: 'Oferta "Desconto 20%" foi criada',
      time: '1 dia atrás',
      icon: TagIcon
    },
    {
      id: 3,
      type: 'customer',
      message: '5 novos clientes cadastrados',
      time: '2 dias atrás',
      icon: UsersIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel do Lojista</h1>
                <p className="text-sm text-gray-600">{merchant?.businessName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/merchant/profile')}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                Ver Perfil
              </button>
              <button
                onClick={() => navigate('/merchant/settings')}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Editar
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-red-600 hover:text-red-700"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bem-vindo, {merchant?.name}!
          </h2>
          <p className="text-gray-600">
            Gerencie seus produtos, clientes e ofertas de forma fácil e eficiente.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              onClick={card.onClick}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.stats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <action.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Visão Geral</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">R$ 12.450</div>
              <div className="text-sm text-gray-600">Vendas este mês</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Clientes ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-gray-600">Produtos vendidos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
