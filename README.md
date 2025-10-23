# NexPrev - Sistema de Cashback

## 📱 Visão Geral

O NexPrev é uma aplicação completa de cashback que conecta clientes e lojistas, oferecendo um sistema de recompensas através de compras em estabelecimentos parceiros.

## 🚀 Funcionalidades

### 👤 Para Clientes
- **Cadastro e Login** com sistema de referência
- **Dashboard** com saldo de cashback e estatísticas
- **Catálogo de Parceiros** com ofertas disponíveis
- **Sistema de Pagamento** integrado
- **Histórico de Transações** detalhado
- **Programa de Indicação** com códigos de referência

### 🏪 Para Lojistas/Parceiros
- **Painel Administrativo** completo
- **Cadastro de Produtos** com gestão de estoque
- **Criação de Ofertas** com diferentes tipos de desconto
- **Visualização de Clientes** e estatísticas de vendas
- **Consulta de Usuários** cadastrados no app
- **Dashboard** com métricas de negócio

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Ícones**: Heroicons
- **Roteamento**: React Router
- **Gerenciamento de Estado**: Context API
- **Build Tool**: Vite

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/nexprev.git
cd nexprev
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o projeto**:
```bash
npm run dev
```

4. **Acesse no navegador**:
```
http://localhost:3006
```

## 🔐 Credenciais de Teste

### Cliente
- **Email**: `teste@teste.com`
- **Senha**: `1`

### Lojista/Parceiro
- **Email**: `teste1@teste.com`
- **Senha**: `123`

## 📁 Estrutura do Projeto

```
nexprev/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos de autenticação
├── hooks/             # Hooks customizados
├── pages/             # Páginas da aplicação
│   ├── Merchant*      # Páginas do painel do lojista
│   └── ...            # Páginas do cliente
├── types.ts           # Definições TypeScript
├── App.tsx            # Componente principal
└── README.md          # Este arquivo
```

## 🎯 Rotas Principais

### Cliente
- `/` - Dashboard principal
- `/login` - Login do cliente
- `/register` - Cadastro do cliente
- `/partners` - Lista de parceiros
- `/profile` - Perfil do usuário

### Lojista
- `/merchant/login` - Login do lojista
- `/merchant/register` - Cadastro do lojista
- `/merchant/dashboard` - Dashboard do lojista
- `/merchant/products` - Gerenciamento de produtos
- `/merchant/offers` - Gerenciamento de ofertas
- `/merchant/customers` - Visualização de clientes

## 🎨 Design Responsivo

O projeto foi desenvolvido com foco em responsividade, adaptando-se perfeitamente a:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Login e cadastro separados para clientes e lojistas
- Proteção de rotas
- Gerenciamento de sessão

### ✅ Painel do Cliente
- Dashboard com métricas pessoais
- Sistema de navegação intuitivo
- Visualização de parceiros e ofertas

### ✅ Painel do Lojista
- Gestão completa de produtos
- Criação e gerenciamento de ofertas
- Visualização de clientes e estatísticas
- Consulta de usuários do app

### ✅ Interface Responsiva
- Design adaptativo para todos os dispositivos
- Componentes otimizados para mobile
- Navegação fluida

## 📈 Próximos Passos

Para uma implementação completa em produção:

1. **Backend API** - Integração com servidor real
2. **Banco de Dados** - Persistência de dados
3. **Sistema de Pagamento** - Integração com gateways
4. **Notificações Push** - Alertas em tempo real
5. **Analytics** - Métricas avançadas
6. **Testes** - Cobertura de testes automatizados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

[Seu Nome] - [seu-email@exemplo.com]

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!