import React, { useState } from 'react';
import { CreditCard, Smartphone, FileText, QrCode, ArrowLeft, Calendar, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function PaymentPage(): React.ReactElement {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  useScrollToTop();

  const subscriptionPlans = [
    { 
      id: 'basic', 
      name: 'Básico', 
      price: 9.90, 
      features: ['Cashback até 2%', 'Suporte por email', 'Até 5 transações/mês'],
      popular: false
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price: 19.90, 
      features: ['Cashback até 5%', 'Suporte prioritário', 'Transações ilimitadas', 'Ofertas exclusivas'],
      popular: true
    },
    { 
      id: 'vip', 
      name: 'VIP', 
      price: 39.90, 
      features: ['Cashback até 10%', 'Suporte 24/7', 'Transações ilimitadas', 'Ofertas exclusivas', 'Cashback bônus'],
      popular: false
    }
  ];

  const paymentHistory = [
    { id: 1, date: '15/12/2024', amount: 19.90, method: 'Cartão de Crédito', status: 'Pago' },
    { id: 2, date: '15/11/2024', amount: 19.90, method: 'Cartão de Crédito', status: 'Pago' },
    { id: 3, date: '15/10/2024', amount: 19.90, method: 'PIX', status: 'Pago' },
  ];

  const handlePayment = () => {
    // Simular redirecionamento para gateway de pagamento
    alert('Redirecionando para gateway de pagamento...');
  };

  return (
    <div className="px-4 space-y-6">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Minha Assinatura</h1>
        <div></div> {/* Empty div for spacing */}
      </div>

      {/* Current Subscription */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Plano Premium</h2>
            <p className="text-sm opacity-90">Ativo desde 15/10/2024</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Próximo pagamento</p>
            <p className="text-lg font-bold">15/01/2025</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span className="text-sm">Assinatura ativa</span>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Valor mensal</p>
            <p className="text-xl font-bold">R$ 19,90</p>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Realizar Pagamento</h3>
        <button 
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-brand-blue to-brand-orange text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Pagar Assinatura - R$ 19,90</span>
        </button>
      </div>

      {/* Plan Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Alterar Plano</h3>
        <div className="space-y-3">
          {subscriptionPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedPlan === plan.id 
                  ? 'border-brand-blue bg-brand-light-blue' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-800">{plan.name}</h4>
                  {plan.popular && (
                    <span className="bg-brand-orange text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-blue">R$ {plan.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>
              </div>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Métodos de Pagamento</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-blue transition-colors">
            <Smartphone className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800 text-center">PIX</h4>
            <p className="text-xs text-gray-600 text-center">Pagamento instantâneo</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-blue transition-colors">
            <CreditCard className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800 text-center">Cartão</h4>
            <p className="text-xs text-gray-600 text-center">Débito ou crédito</p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Histórico de Pagamentos</h3>
        <div className="space-y-3">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{payment.method}</p>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">R$ {payment.amount.toFixed(2)}</p>
                <p className="text-sm text-green-600">{payment.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="pt-4">
        <button className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Cancelar Assinatura</span>
        </button>
      </div>
    </div>
  );
}
