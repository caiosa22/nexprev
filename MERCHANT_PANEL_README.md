# Painel do Lojista - NexPrev

## Visão Geral

O painel do lojista é uma interface completa para que comerciantes possam gerenciar seus negócios no aplicativo NexPrev. Ele oferece todas as funcionalidades necessárias para cadastrar produtos, gerenciar clientes, criar ofertas e consultar usuários do app.

## Funcionalidades Implementadas

### 🔐 Autenticação
- **Login do Lojista** (`/merchant/login`)
  - Sistema de autenticação separado para lojistas
  - Credenciais de teste: `lojista@teste.com` / `123`
  - Redirecionamento automático para o dashboard após login

- **Cadastro do Lojista** (`/merchant/register`)
  - Formulário completo com validação
  - Dados pessoais e da empresa
  - Validação de CNPJ e campos obrigatórios

### 📊 Dashboard Principal (`/merchant/dashboard`)
- Visão geral das métricas do negócio
- Cards com estatísticas principais
- Ações rápidas para funcionalidades mais usadas
- Atividades recentes
- Navegação fácil para todas as seções

### 🛍️ Gerenciamento de Produtos
- **Lista de Produtos** (`/merchant/products`)
  - Visualização de todos os produtos cadastrados
  - Filtros por categoria e status
  - Busca por nome e descrição
  - Ações: ativar/desativar, editar, excluir

- **Cadastro de Produtos** (`/merchant/products/new`)
  - Formulário completo para novos produtos
  - Campos: nome, descrição, preço, categoria, estoque
  - Validação de dados obrigatórios
  - Upload de imagem (URL)

### 👥 Gerenciamento de Clientes
- **Visualização de Clientes** (`/merchant/customers`)
  - Lista de todos os clientes que compraram
  - Estatísticas de vendas e cashback
  - Informações detalhadas de cada cliente
  - Histórico de compras

### 🔍 Consulta de Usuários (`/merchant/search-users`)
- Busca por usuários cadastrados no app
- Verificação de saldo de cashback
- Histórico de compras
- Status da conta (ativa/inativa)
- Informações de referência

### 🏷️ Gerenciamento de Ofertas
- **Lista de Ofertas** (`/merchant/offers`)
  - Visualização de todas as ofertas criadas
  - Status: ativa, inativa, expirada
  - Estatísticas de ofertas
  - Ações: ativar/desativar, editar, excluir

- **Criação de Ofertas** (`/merchant/offers/new`)
  - Formulário completo para novas ofertas
  - Tipos de desconto: percentual ou valor fixo
  - Configuração de valores mínimos e máximos
  - Período de validade
  - Aplicação a produtos específicos ou todos

## Estrutura de Arquivos

```
contexts/
├── MerchantAuthContext.tsx    # Contexto de autenticação para lojistas

pages/
├── MerchantLoginPage.tsx      # Página de login do lojista
├── MerchantRegisterPage.tsx   # Página de cadastro do lojista
├── MerchantDashboard.tsx      # Dashboard principal
├── MerchantProductsPage.tsx   # Lista de produtos
├── MerchantProductCreatePage.tsx # Cadastro de produtos
├── MerchantCustomersPage.tsx  # Lista de clientes
├── MerchantSearchUsersPage.tsx # Consulta de usuários
├── MerchantOffersPage.tsx     # Lista de ofertas
└── MerchantOfferCreatePage.tsx # Criação de ofertas

types.ts                       # Interfaces TypeScript atualizadas
App.tsx                        # Rotas do painel do lojista
```

## Rotas Disponíveis

### Rotas Públicas
- `/merchant/login` - Login do lojista
- `/merchant/register` - Cadastro do lojista

### Rotas Protegidas (requer autenticação)
- `/merchant/dashboard` - Dashboard principal
- `/merchant/products` - Lista de produtos
- `/merchant/products/new` - Cadastro de produto
- `/merchant/customers` - Lista de clientes
- `/merchant/search-users` - Consulta de usuários
- `/merchant/offers` - Lista de ofertas
- `/merchant/offers/new` - Criação de oferta

## Tipos TypeScript

### Merchant
```typescript
interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  cnpj: string;
  address: string;
  category: string;
  description: string;
  logoUrl?: string;
  isActive: boolean;
  createdAt: string;
}
```

### Product
```typescript
interface Product {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  stock: number;
  createdAt: string;
}
```

### MerchantOffer
```typescript
interface MerchantOffer {
  id: string;
  merchantId: string;
  productId?: string;
  title: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
}
```

### Customer
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchase: string;
  cashbackEarned: number;
  isActive: boolean;
}
```

## Como Usar

1. **Acesse o painel do lojista**: `/merchant/login`
2. **Use as credenciais de teste**: `lojista@teste.com` / `123`
3. **Explore o dashboard** para ver as funcionalidades disponíveis
4. **Cadastre produtos** através do menu "Produtos"
5. **Visualize clientes** na seção "Clientes"
6. **Crie ofertas** para atrair mais clientes
7. **Consulte usuários** para verificar quem está no app

## Características Técnicas

- **React 18** com TypeScript
- **React Router** para navegação
- **Context API** para gerenciamento de estado
- **Tailwind CSS** para estilização
- **Heroicons** para ícones
- **Validação de formulários** em tempo real
- **Responsive design** para diferentes dispositivos
- **Proteção de rotas** com autenticação

## Próximos Passos

Para uma implementação completa em produção, considere:

1. **Integração com API real** para substituir os dados mock
2. **Upload de imagens** real para produtos e ofertas
3. **Notificações** para ações importantes
4. **Relatórios detalhados** de vendas e performance
5. **Integração com sistemas de pagamento**
6. **Chat/suporte** para comunicação com clientes
7. **Analytics** avançados para insights de negócio

## Credenciais de Teste

- **Email**: lojista@teste.com
- **Senha**: 123

O painel está totalmente funcional e pronto para uso!
