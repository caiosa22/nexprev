import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMerchantAuth } from '../contexts/MerchantAuthContext';
import { 
  ArrowLeftIcon,
  TagIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const MerchantOfferCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { merchant } = useMerchantAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage', // 'percentage' ou 'amount'
    discountValue: '',
    minPurchaseAmount: '',
    maxDiscountAmount: '',
    validFrom: '',
    validUntil: '',
    productId: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock produtos - em uma aplicação real, isso viria de uma API
  const products = [
    { id: '1', name: 'Smartphone XYZ', price: 1299.99 },
    { id: '2', name: 'Camiseta Básica', price: 29.99 },
    { id: '3', name: 'Livro de Programação', price: 89.90 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Título da oferta é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.discountValue.trim()) {
      newErrors.discountValue = formData.discountType === 'percentage' 
        ? 'Percentual de desconto é obrigatório' 
        : 'Valor do desconto é obrigatório';
    } else {
      const value = Number(formData.discountValue);
      if (isNaN(value) || value <= 0) {
        newErrors.discountValue = 'Valor deve ser maior que zero';
      }
      if (formData.discountType === 'percentage' && value > 100) {
        newErrors.discountValue = 'Percentual não pode ser maior que 100%';
      }
    }
    if (!formData.validFrom) newErrors.validFrom = 'Data de início é obrigatória';
    if (!formData.validUntil) newErrors.validUntil = 'Data de fim é obrigatória';
    
    if (formData.validFrom && formData.validUntil) {
      const startDate = new Date(formData.validFrom);
      const endDate = new Date(formData.validUntil);
      if (endDate <= startDate) {
        newErrors.validUntil = 'Data de fim deve ser posterior à data de início';
      }
    }

    if (formData.minPurchaseAmount && isNaN(Number(formData.minPurchaseAmount))) {
      newErrors.minPurchaseAmount = 'Valor mínimo deve ser um número válido';
    }

    if (formData.maxDiscountAmount && isNaN(Number(formData.maxDiscountAmount))) {
      newErrors.maxDiscountAmount = 'Valor máximo deve ser um número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simular criação da oferta
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    
    // Mostrar mensagem de sucesso e redirecionar
    alert('Oferta criada com sucesso!');
    navigate('/merchant/offers');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/merchant/offers')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <TagIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nova Oferta</h1>
                <p className="text-sm text-gray-600">Crie uma nova promoção para seus clientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Oferta</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título da Oferta *
                  </label>
                  <div className="mt-1 relative">
                    <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Desconto de 20% em Eletrônicos"
                    />
                  </div>
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição *
                  </label>
                  <div className="mt-1 relative">
                    <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Descreva os detalhes da oferta..."
                    />
                  </div>
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                    Produto Específico (Opcional)
                  </label>
                  <div className="mt-1 relative">
                    <CubeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      id="productId"
                      name="productId"
                      value={formData.productId}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Aplicar a todos os produtos</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - R$ {product.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Deixe em branco para aplicar a todos os produtos
                  </p>
                </div>
              </div>
            </div>

            {/* Configurações de Desconto */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações de Desconto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                    Tipo de Desconto *
                  </label>
                  <div className="mt-1">
                    <select
                      id="discountType"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="percentage">Percentual (%)</option>
                      <option value="amount">Valor Fixo (R$)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                    {formData.discountType === 'percentage' ? 'Percentual de Desconto (%) *' : 'Valor do Desconto (R$) *'}
                  </label>
                  <div className="mt-1 relative">
                    {formData.discountType === 'percentage' ? (
                      <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    ) : (
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    )}
                    <input
                      id="discountValue"
                      name="discountValue"
                      type="number"
                      step={formData.discountType === 'percentage' ? '1' : '0.01'}
                      min="0"
                      max={formData.discountType === 'percentage' ? '100' : undefined}
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.discountValue ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={formData.discountType === 'percentage' ? '20' : '50.00'}
                    />
                  </div>
                  {errors.discountValue && <p className="mt-1 text-sm text-red-600">{errors.discountValue}</p>}
                </div>

                <div>
                  <label htmlFor="minPurchaseAmount" className="block text-sm font-medium text-gray-700">
                    Valor Mínimo de Compra (R$)
                  </label>
                  <div className="mt-1 relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="minPurchaseAmount"
                      name="minPurchaseAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.minPurchaseAmount}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.minPurchaseAmount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="100.00"
                    />
                  </div>
                  {errors.minPurchaseAmount && <p className="mt-1 text-sm text-red-600">{errors.minPurchaseAmount}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Valor mínimo para aplicar o desconto
                  </p>
                </div>

                <div>
                  <label htmlFor="maxDiscountAmount" className="block text-sm font-medium text-gray-700">
                    Valor Máximo de Desconto (R$)
                  </label>
                  <div className="mt-1 relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="maxDiscountAmount"
                      name="maxDiscountAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.maxDiscountAmount}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.maxDiscountAmount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="200.00"
                    />
                  </div>
                  {errors.maxDiscountAmount && <p className="mt-1 text-sm text-red-600">{errors.maxDiscountAmount}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Limite máximo do desconto (opcional)
                  </p>
                </div>
              </div>
            </div>

            {/* Período de Validade */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Período de Validade</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
                    Data de Início *
                  </label>
                  <div className="mt-1 relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="validFrom"
                      name="validFrom"
                      type="date"
                      value={formData.validFrom}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.validFrom ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.validFrom && <p className="mt-1 text-sm text-red-600">{errors.validFrom}</p>}
                </div>

                <div>
                  <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
                    Data de Fim *
                  </label>
                  <div className="mt-1 relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="validUntil"
                      name="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.validUntil ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.validUntil && <p className="mt-1 text-sm text-red-600">{errors.validUntil}</p>}
                </div>
              </div>
            </div>

            {/* Imagem da Oferta */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Imagem da Oferta</h3>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  URL da Imagem
                </label>
                <div className="mt-1 relative">
                  <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="https://exemplo.com/imagem-oferta.jpg"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Opcional: URL da imagem para promover a oferta
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/merchant/offers')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Criar Oferta
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MerchantOfferCreatePage;
