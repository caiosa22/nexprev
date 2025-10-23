import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PlusIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { MerchantOffer } from '../types';

const MerchantOffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - em uma aplicação real, isso viria de uma API
  const [offers] = useState<MerchantOffer[]>([
    {
      id: '1',
      merchantId: 'merchant_1',
      title: 'Desconto de 20% em Eletrônicos',
      description: 'Aproveite nosso desconto especial em todos os produtos da categoria eletrônicos',
      discountPercentage: 20,
      minPurchaseAmount: 100,
      maxDiscountAmount: 200,
      validFrom: '2024-01-01',
      validUntil: '2024-01-31',
      isActive: true,
      imageUrl: 'https://via.placeholder.com/150',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      merchantId: 'merchant_1',
      title: 'R$ 50 de desconto',
      description: 'Desconto fixo de R$ 50 em compras acima de R$ 200',
      discountAmount: 50,
      minPurchaseAmount: 200,
      validFrom: '2024-01-15',
      validUntil: '2024-02-15',
      isActive: true,
      imageUrl: 'https://via.placeholder.com/150',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      merchantId: 'merchant_1',
      title: 'Promoção de Verão',
      description: 'Oferta especial para o verão com 15% de desconto',
      discountPercentage: 15,
      validFrom: '2023-12-01',
      validUntil: '2023-12-31',
      isActive: false,
      imageUrl: 'https://via.placeholder.com/150',
      createdAt: '2023-12-01'
    }
  ]);

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && offer.isActive) ||
                         (filterStatus === 'inactive' && !offer.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (offerId: string) => {
    // Em uma aplicação real, isso faria uma chamada para a API
    console.log('Toggle status for offer:', offerId);
  };

  const handleDeleteOffer = (offerId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta oferta?')) {
      // Em uma aplicação real, isso faria uma chamada para a API
      console.log('Delete offer:', offerId);
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

  const isOfferExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const isOfferActive = (offer: MerchantOffer) => {
    const now = new Date();
    const validFrom = new Date(offer.validFrom);
    const validUntil = new Date(offer.validUntil);
    
    return offer.isActive && now >= validFrom && now <= validUntil;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/merchant/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <TagIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Ofertas</h1>
                  <p className="text-sm text-gray-600">Gerencie suas promoções e ofertas</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/merchant/offers/new')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Oferta
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Ofertas</p>
                <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ofertas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.filter(o => isOfferActive(o)).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ofertas Expiradas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.filter(o => isOfferExpired(o.validUntil)).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ofertas Inativas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.filter(o => !o.isActive).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Título ou descrição da oferta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  id="status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">Todas as ofertas</option>
                  <option value="active">Ofertas ativas</option>
                  <option value="inactive">Ofertas inativas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Ofertas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Ofertas ({filteredOffers.length})
            </h3>
          </div>

          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma oferta encontrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Tente ajustar os filtros de busca.'
                  : 'Comece criando sua primeira oferta.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/merchant/offers/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Criar Oferta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {offer.imageUrl ? (
                          <img
                            src={offer.imageUrl}
                            alt={offer.title}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <TagIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {offer.title}
                          </h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isOfferActive(offer)
                              ? 'bg-green-100 text-green-800' 
                              : isOfferExpired(offer.validUntil)
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {isOfferActive(offer) ? 'Ativa' : 
                             isOfferExpired(offer.validUntil) ? 'Expirada' : 
                             'Inativa'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {offer.description}
                        </p>
                        
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            {offer.discountPercentage ? (
                              <>
                                <TagIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium text-gray-900">
                                  {offer.discountPercentage}% de desconto
                                </span>
                              </>
                            ) : (
                              <>
                                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium text-gray-900">
                                  {formatCurrency(offer.discountAmount || 0)} de desconto
                                </span>
                              </>
                            )}
                          </span>
                          
                          {offer.minPurchaseAmount && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                Mín: {formatCurrency(offer.minPurchaseAmount)}
                              </span>
                            </>
                          )}
                          
                          {offer.maxDiscountAmount && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                Máx: {formatCurrency(offer.maxDiscountAmount)}
                              </span>
                            </>
                          )}
                          
                          <span>•</span>
                          <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(offer.validFrom)} - {formatDate(offer.validUntil)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(offer.id)}
                        className={`p-2 rounded-lg ${
                          offer.isActive 
                            ? 'text-orange-600 hover:bg-orange-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={offer.isActive ? 'Desativar oferta' : 'Ativar oferta'}
                      >
                        {offer.isActive ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => navigate(`/merchant/offers/${offer.id}/edit`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Editar oferta"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Excluir oferta"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantOffersPage;
