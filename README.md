# SentinelTrack - Gerenciador de Motos em Pátios

SentinelTrack é uma aplicação mobile desenvolvida com React Native (Expo) para organizar e controlar motocicletas em pátios logísticos. O aplicativo permite o cadastro de motos com localização por vaga, visualização em dashboard, geração de relatórios e exportação em PDF ou CSV.

## Funcionalidades

### Autenticação e Segurança
- Login e cadastro com Firebase Authentication
- Persistência de sessão com AsyncStorage
- Logout seguro

### Gestão de Motocicletas
- Cadastro completo de motos (placa, modelo, marca, cor, ano)
- CRUD completo (Create, Read, Update, Delete)
- Movimentação de motos entre setores
- Validação de vaga disponível
- Integração completa com API .NET

### Dashboard e Visualização
- Dashboard com visualização em matriz por setores
- Estatísticas em tempo real
- Indicadores de vagas ocupadas/disponíveis
- Interface responsiva e intuitiva

### Relatórios e Exportação
- Geração de relatórios filtrados por data, placa e setor
- Exportação em PDF e CSV
- Histórico de movimentações

### Notificações Push
- Notificações para nova moto cadastrada
- Alertas de moto removida
- Lembretes de manutenção
- Notificações de vagas disponíveis

### Internacionalização
- Suporte completo para Português e Espanhol
- Troca automática baseada no idioma do dispositivo
- Interface totalmente traduzida

### Temas e Personalização
- Modo claro e escuro
- Troca automática baseada no sistema
- Design seguindo Material Design Guidelines
- Cores personalizadas e consistentes

## Participantes

| Nome               | RM      | GitHub |
|--------------------|---------|--------|
| Thomaz Oliveira    | 555323  | thomaz-oliveira |
| Vinicius Souza     | 556089  | SouzaEu |
| Gabriel Duarte     | 556972  | gabriel-duarte |

## Tecnologias Utilizadas

### Frontend Mobile
- React Native + Expo SDK 53
- React Navigation (Drawer + Stack)
- AsyncStorage para persistência local
- Expo Print & Sharing para relatórios
- React Native Picker para seleções

### Autenticação e Backend
- Firebase Authentication
- API REST .NET integrada
- Axios para requisições HTTP

### Notificações e Comunicação
- Expo Notifications
- Push Notifications locais e remotas
- Firebase Cloud Messaging (FCM)

### Internacionalização e Temas
- i18n-js para traduções
- React Native Localize
- Context API para gerenciamento de tema
- Material Design Guidelines

### Ferramentas de Desenvolvimento
- EAS Build para compilação
- Firebase App Distribution
- Git para versionamento
- ESLint e Prettier para padronização

## CI/CD Pipeline

O projeto possui um sistema completo de CI/CD com GitHub Actions:

### Workflows Implementados
- **CI/CD Pipeline**: Lint, testes, build, segurança e análise de código
- **Pull Request Checks**: Validações específicas para PRs
- **Deploy Automático**: Build e distribuição via Firebase App Distribution
- **Dependabot**: Atualizações automáticas de dependências

### Qualidade de Código
- ESLint para análise estática
- Prettier para formatação
- Husky para git hooks
- Commitlint para padronização de commits
- Testes automatizados com Jest

## Pré-requisitos

- Node.js 18+ e npm instalados
- Expo CLI instalado:
```bash
npm install -g @expo/cli
```

## Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/SouzaEu/mobileSentinelTrack

# 2. Instale as dependências
npm install --legacy-peer-deps

# 3. Inicie o projeto
npx expo start
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm start                 # Inicia o servidor Expo
npm run android          # Abre no Android
npm run ios              # Abre no iOS

# Qualidade de código
npm run lint             # Executa ESLint
npm run lint:fix         # Corrige problemas do ESLint
npm run prettier         # Formata código
npm run prettier:check   # Verifica formatação

# Testes
npm test                 # Executa testes
npm run test:watch       # Executa testes em modo watch
npm run test:coverage    # Executa testes com cobertura

# Validação completa
npm run validate         # Executa lint + prettier + type-check
```

Escaneie o QR code com o aplicativo Expo Go no seu celular para testar a aplicação.

## Estrutura de Pastas

```
SentinelTrack-app/
├── assets/                          # Recursos estáticos (ícones, imagens)
├── components/                      # Componentes reutilizáveis
├── contexts/                        # Context APIs
│   └── ThemeContext.js             # Gerenciamento de temas
├── locales/                        # Arquivos de tradução
│   ├── pt.json                     # Português
│   └── es.json                     # Espanhol
├── screens/                        # Telas da aplicação
│   ├── LoginScreen.js              # Tela de login
│   ├── RegisterScreen.js           # Tela de cadastro
│   ├── DashboardScreen.js          # Dashboard principal
│   ├── CadastroMotoScreen.js       # Cadastro básico de motos
│   ├── MotorcycleManagementScreen.js # CRUD completo de motos
│   ├── RelatoriosScreen.js         # Geração de relatórios
│   └── AboutScreen.js              # Sobre o aplicativo
├── services/                       # Serviços e integrações
│   ├── api/                        # Integração com API
│   │   ├── client.js               # Cliente HTTP
│   │   ├── motorcycles.js          # CRUD de motocicletas
│   │   ├── movements.js            # Movimentações
│   │   ├── sectors.js              # Setores
│   │   └── validators.js           # Validações
│   ├── firebaseConfig.js           # Configuração Firebase
│   ├── i18n.js                     # Internacionalização
│   └── notificationService.js      # Serviço de notificações
├── App.js                          # Componente raiz
├── app.json                        # Configuração Expo
├── eas.json                        # Configuração EAS Build
├── index.js                        # Ponto de entrada
├── package.json                    # Dependências
└── README.md                       # Documentação
```

## Deploy e Publicação

### Firebase App Distribution
O aplicativo está configurado para ser publicado via Firebase App Distribution:

```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login no EAS
eas login

# Configurar projeto
eas build:configure

# Build para preview/distribuição
eas build --platform android --profile preview
```

### Configurações de Deploy
- Bundle ID: com.fiap.sentineltrack
- App Name: SentinelTrack
- Version: 1.0.0
- Commit Hash: 2f7a1dae85b4c90c9b3958febcfa5724fbcaaca5

## Checklist de Entrega Final

### Implementação Funcional (30 pontos)
- Todas as telas implementadas e funcionais
- Navegação integrada e fluida
- Tratamento completo de formulários com validações
- Indicadores de carregamento em chamadas de rede
- Todos os botões e interações operacionais

### Publicação do App (10 pontos)
- Configurado para Firebase App Distribution
- Tela "Sobre o App" com hash do commit
- EAS Build configurado

### Notificações Push (10 pontos)
- Notificações para nova moto cadastrada
- Notificações para moto removida
- Notificações de vagas disponíveis
- Sistema testável e demonstrável

### Integração com API (10 pontos)
- CRUD completo de motocicletas
- CRUD de setores e movimentações
- Tratamento de erros e validações
- Indicadores de carregamento

### Localização e Internacionalização (10 pontos)
- Suporte para Português e Espanhol
- Todas as strings traduzidas
- Troca automática de idioma

### Estilização com Tema (10 pontos)
- Modo claro e escuro
- Personalização visual consistente
- Material Design Guidelines
- Identidade visual coerente

### Arquitetura de Código (10 pontos)
- Organização lógica de arquivos e pastas
- Nomeação clara e padronizada
- Separação adequada de responsabilidades
- Código limpo e bem estruturado
- Boas práticas do React Native

### Documentação (10 pontos)
- README.md completo e atualizado
- Estrutura de pastas documentada
- Informações dos desenvolvedores
- Instruções de instalação e uso

## Observações

Este projeto foi desenvolvido como parte do Challenge FIAP 2025 - 3º Sprint. Aplicativo completo e funcional, pronto para uso em produção.
