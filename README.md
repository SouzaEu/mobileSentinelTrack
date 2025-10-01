# SentinelTrack Mobile

Sistema de monitoramento de frotas de motocicletas desenvolvido em React Native.

## Proposta do Projeto

O SentinelTrack Mobile é um aplicativo desenvolvido para facilitar o gerenciamento e monitoramento de frotas de motocicletas em tempo real. A solução oferece uma interface intuitiva para controle completo dos veículos, permitindo acompanhar status, localização, bateria e receber alertas importantes.

O projeto foi desenvolvido como parte da disciplina de Mobile Development, implementando as melhores práticas de desenvolvimento React Native com TypeScript, arquitetura modular e integração com APIs.

### Funcionalidades

- Autenticação de usuários (login/cadastro)
- Gerenciamento completo de motocicletas (CRUD)
- Monitoramento de status, localização e bateria
- Sistema de alertas e notificações
- Tema claro e escuro
- Interface responsiva

## Tecnologias

- **React Native** 0.74.5
- **Expo** ~51.0.0
- **TypeScript** ~5.3.3
- **React Navigation** 6.x
- **Expo Secure Store** (armazenamento seguro)
- **AsyncStorage** (cache e persistência)
- **Vector Icons** (Ionicons)

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env`:

**Para usar com Backend Java (recomendado):**
```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
EXPO_PUBLIC_ENVIRONMENT=development
```

**Para desenvolvimento com mocks:**
```env
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=development
```

3. Execute o projeto:

```bash
# Web
npm run web

# Mobile
npx expo start
```

## Como Usar

### Credenciais de Teste

- Email: admin@test.com
- Senha: 123456

### Funcionalidades

- Dashboard com estatísticas da frota
- Cadastro e gerenciamento de motocicletas
- Sistema de alertas em tempo real
- Alternância entre tema claro e escuro

## Estrutura de Pastas

```
sentineltrack-mobile/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes base (Button, Card, Input)
│   │   ├── AnimatedCard.tsx # Componente com animações
│   │   └── ErrorBoundary.tsx # Tratamento de erros
│   ├── contexts/           # Gerenciamento de estado global
│   │   ├── AuthContext.tsx # Contexto de autenticação
│   │   └── ThemeContext.tsx # Contexto de tema
│   ├── hooks/              # Hooks customizados
│   │   ├── useApi.ts       # Hook para requisições API
│   │   └── useAnimatedValue.ts # Hook para animações
│   ├── navigation/         # Configuração de navegação
│   │   └── AppNavigator.tsx # Navegação principal
│   ├── screens/            # Telas da aplicação
│   │   ├── auth/           # Telas de autenticação
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   └── main/           # Telas principais
│   │       ├── HomeScreen.tsx
│   │       ├── MotorcyclesScreen.tsx
│   │       ├── AddMotorcycleScreen.tsx
│   │       ├── EditMotorcycleScreen.tsx
│   │       ├── MotorcycleDetailScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── services/           # Integração com APIs
│   │   ├── api.ts          # Cliente HTTP base
│   │   ├── authService.ts  # Serviços de autenticação
│   │   └── motorcycleService.ts # Serviços de motos
│   ├── utils/              # Utilitários e helpers
│   │   ├── storage.ts      # Wrapper de armazenamento
│   │   └── theme.ts        # Utilitários de tema
│   └── constants/          # Constantes da aplicação
│       └── index.ts        # Configurações e validações
├── assets/                 # Recursos estáticos
├── docs/                   # Documentação adicional
├── .env.example           # Exemplo de variáveis de ambiente
├── package.json           # Dependências do projeto
└── README.md              # Este arquivo
```

## Vídeo de Demonstração

O vídeo demonstrativo do aplicativo em funcionamento está disponível e apresenta:

- Processo completo de login e autenticação
- Navegação entre todas as telas do aplicativo
- Funcionalidades de CRUD de motocicletas (criar, visualizar, editar, excluir)
- Dashboard com estatísticas em tempo real
- Sistema de alertas e notificações
- Alternância entre tema claro e escuro
- Interface responsiva e animações

**Nota**: O vídeo será gravado demonstrando o aplicativo rodando no navegador web (Expo Web) para facilitar a visualização de todas as funcionalidades.

## Equipe

| Nome                              | RM       | GitHub                                             |
| --------------------------------- | -------- | -------------------------------------------------- |
| Thomaz Oliveira Vilas Boas Bartol | RM555323 | [@thomazbartol](https://github.com/thomazbartol)   |
| Vinicius Souza Carvalho           | RM556089 | [@SouzaEu](https://github.com/SouzaEu)             |
| Gabriel Duarte Pinto              | RM556972 | [@gabrielduar7e](https://github.com/gabrielduar7e) |
