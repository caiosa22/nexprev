import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  TrendingUpIcon,
  TagIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Mock data - em uma aplicação real, isso viria de uma API
  const stats = {
    totalMerchants: 156,
    activeMerchants: 142,
    totalCustomers: 12450,
    activeCustomers: 11800,
    totalTransactions: 45678,
    totalRevenue: 2450000.50,
    totalCashbackPaid: 245000.05,
    averageTransaction: 53.65,
    newMerchantsThisMonth: 12,
    newCustomersThisMonth: 890,
    totalOffers: 1234,
    activeOffers: 856
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const statCards = [
    {
      title: 'Total de Lojistas',
      value: formatNumber(stats.totalMerchants),
      subtitle: `${stats.activeMerchants} ativos`,
      icon: BuildingOfficeIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12 este mês'
    },
    {
      title: 'Total de Clientes',
      value: formatNumber(stats.totalCustomers),
      subtitle: `${stats.activeCustomers} ativos`,
      icon: UsersIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+890 este mês'
    },
    {
      title: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      subtitle: 'Todas as transações',
      icon: CurrencyDollarIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+15.2% vs mês anterior'
    },
    {
      title: 'Cashback Pago',
      value: formatCurrency(stats.totalCashbackPaid),
      subtitle: 'Total distribuído',
      icon: TagIcon,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: '10% da receita'
    },
    {
      title: 'Transações',
      value: formatNumber(stats.totalTransactions),
      subtitle: `Média: ${formatCurrency(stats.averageTransaction)}`,
      icon: ShoppingCartIcon,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      trend: '+8.5% vs mês anterior'
    },
    {
      title: 'Ofertas Ativas',
      value: formatNumber(stats.activeOffers),
      subtitle: `${stats.totalOffers} total`,
      icon: TagIcon,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      trend: `${stats.activeOffers} ativas`
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'merchant',
      message: 'Novo lojista cadastrado: "Loja ABC"',
      time: '2 horas atrás',
      icon: BuildingOfficeIcon
    },
    {
      id: 2,
      type: 'customer',
      message: '50 novos clientes cadastrados',
      time: '5 horas atrás',
      icon: UsersIcon
    },
    {
      id: 3,
      type: 'transaction',
      message: 'R$ 12.450 em novas transações',
      time: '1 dia atrás',
      icon: ShoppingCartIcon
    },
    {
      id: 4,
      type: 'offer',
      message: '15 novas ofertas criadas',
      time: '2 dias atrás',
      icon: TagIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {admin?.name}</p>
              </div>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Visão Geral do Sistema
          </h2>
          <p className="text-gray-600">
            Acompanhe todas as métricas e atividades do NexPrev
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mb-2">{stat.subtitle}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Métricas Detalhadas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Métricas de Performance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Taxa de Conversão</span>
                </div>
                <span className="text-sm font-bold text-gray-900">68.5%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Taxa de Retenção</span>
                </div>
                <span className="text-sm font-bold text-gray-900">94.8%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Tempo Médio de Resposta</span>
                </div>
                <span className="text-sm font-bold text-gray-900">2.3s</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUpIcon className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Crescimento Mensal</span>
                </div>
                <span className="text-sm font-bold text-gray-900">+12.5%</span>
              </div>
            </div>
          </div>

          {/* Atividades Recentes */}
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

        {/* Resumo Financeiro */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Receita Bruta</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Cashback Distribuído</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalCashbackPaid)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Receita Líquida</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(stats.totalRevenue - stats.totalCashbackPaid)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.averageTransaction)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
