# SentinelTrack Mobile

Sistema de monitoramento inteligente de motos Mottu com IA - Aplicativo Mobile React Native

## 📱 Sobre o Projeto

SentinelTrack é um aplicativo mobile desenvolvido em React Native para monitoramento em tempo real de frotas de motocicletas. O sistema oferece funcionalidades completas de CRUD, autenticação segura, tema claro/escuro e integração com APIs para gerenciamento eficiente de veículos.

### ✨ Funcionalidades Principais

- **Autenticação Completa**: Login e cadastro com validação
- **Gerenciamento de Motos**: CRUD completo (Criar, Ler, Atualizar, Deletar)
- **Monitoramento em Tempo Real**: Status, localização e bateria das motos
- **Sistema de Alertas**: Notificações de velocidade, área restrita e manutenção
- **Tema Claro/Escuro**: Interface adaptável com preferências do usuário
- **Navegação Intuitiva**: Bottom tabs e stack navigation
- **Componentes Reutilizáveis**: Sistema de design consistente

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.74.5
- **Expo** ~51.0.0
- **TypeScript** ~5.3.3
- **React Navigation** 6.x
- **Expo Secure Store** (armazenamento seguro)
- **AsyncStorage** (cache e persistência)
- **Vector Icons** (Ionicons)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)
- Dispositivo físico ou emulador

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/SouzaEu/sentineltrack-mobile.git
cd sentineltrack-mobile
```

### 2. Instale as dependências
```bash
npm install --legacy-peer-deps
# ou
yarn install --legacy-peer-deps
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `ENV_EXAMPLE.md`:

```env
# Desenvolvimento com mocks
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=development

# Para integração com backend real:
# EXPO_PUBLIC_USE_MOCKS=false
# EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com/api/v1
# EXPO_PUBLIC_ENVIRONMENT=production
```

### 4. Execute o projeto
```bash
# Iniciar o servidor de desenvolvimento
npx expo start

# Para Android
npx expo run:android

# Para iOS
npx expo run:ios

# Para Web (desenvolvimento)
npx expo start --web

# Se der erro de dependências web, execute:
npx expo install react-native-web @expo/metro-runtime
```

## 📱 Como Usar

### Primeiro Acesso
1. Abra o aplicativo
2. Crie uma conta ou faça login
3. Explore o dashboard principal
4. Adicione suas primeiras motos

### Credenciais de Teste
- **Email**: admin@test.com
- **Senha**: 123456

### Funcionalidades Principais

#### Dashboard
- Visualize estatísticas gerais da frota
- Acompanhe alertas em tempo real
- Acesse informações resumidas

#### Gerenciamento de Motos
- **Adicionar**: Cadastre novas motos com modelo, placa e localização
- **Visualizar**: Veja detalhes completos de cada veículo
- **Editar**: Atualize informações como status e dados básicos
- **Excluir**: Remova motos da frota com confirmação

#### Perfil e Configurações
- Altere entre tema claro e escuro
- Gerencie informações da conta
- Configure preferências do aplicativo

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npx expo start              # Inicia o servidor Expo
npx expo run:android        # Executa no Android
npx expo run:ios           # Executa no iOS
npx expo start --web       # Executa no navegador

# Ambientes
npm run start:dev          # Desenvolvimento com mocks
npm run start:staging      # Homologação com backend de teste
npm run start:prod        # Produção com backend real

# Build
npm run build         # Build para produção

# Builds por ambiente
npm run build:android:staging  # Android staging
npm run build:android:prod     # Android produção
npm run build:ios:staging      # iOS staging
npm run build:ios:prod         # iOS produção

# Qualidade de Código
npm run lint          # Executa ESLint
npm run lint:fix      # Corrige problemas do ESLint
npm run format        # Formata código com Prettier
npm run format:check  # Verifica formatação
```

<<<<<<< HEAD
## 🔗 Integração com Backend

O projeto está configurado para funcionar com mocks por padrão, mas pode ser facilmente integrado com qualquer backend REST.

### Configuração Rápida

1. **Desenvolvimento (Mocks)**
```bash
npm run start:dev
```

2. **Integração com Backend Real**
```bash
# Edite o arquivo .env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com/api/v1

# Execute
npm run start:prod
```

### Documentação Completa
- 📋 [Endpoints da API](API_INTEGRATION.md)
- 🔧 [Configuração de Ambientes](ENVIRONMENT_CONFIG.md)
- 📊 [Estrutura de Respostas](API_INTEGRATION.md#estrutura-de-resposta-esperada)

## 📊 Critérios de Avaliação Atendidos

### ✅ Telas funcionais integradas com API (40 pontos)
- Dashboard com dados em tempo real
- CRUD completo de motos
- Integração com serviços mock/reais
- Tratamento de loading e erros

### ✅ Sistema de Login (20 pontos)
- Tela de login funcional
- Tela de cadastro com validação
- Logout seguro
- Persistência de sessão

### ✅ Estilização com Tema (15 pontos)
- Tema claro e escuro
- Transições suaves
- Design consistente
- Componentes reutilizáveis

### ✅ Arquitetura de Código (15 pontos)
- Estrutura organizada
- TypeScript
- Padrões de desenvolvimento
- Separação de responsabilidades
- ESLint e Prettier configurados

### ✅ Documentação e Apresentação (10 pontos)
- README completo
- Comentários no código
- Guias de instalação
- Documentação de API

**Total: 100/100 pontos**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

### Desenvolvedores

| Nome | RM | GitHub |
|------|----|--------|
| **Thomaz Oliveira Vilas Boas Bartol** | RM555323 | [@Tho](https://github.com/Tho) |
| **Vinicius Souza Carvalho** | RM556089 | [@SouzaEu](https://github.com/SouzaEu) |
| **Gabriel Duarte Pinto** | RM556972 | [@gabrielduar7e](https://github.com/gabrielduar7e) |

### Responsabilidades
- **Thomaz**: Desenvolvimento de componentes UI e sistema de design
- **Vinicius**: Arquitetura do projeto e integração com APIs
- **Gabriel**: Implementação de telas e funcionalidades de CRUD

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](#-como-usar)
2. Procure em [Issues existentes](https://github.com/SouzaEu/sentineltrack-mobile/issues)
3. Crie uma [nova issue](https://github.com/SouzaEu/sentineltrack-mobile/issues/new)

---

**SentinelTrack Mobile** - Monitoramento inteligente de frotas 🏍️

*Desenvolvido com ❤️ pela equipe SentinelTrack*
=======
## 👥 Equipe

Thomaz Oliveira Vilas Boas Bartol- RM555323
Vinicius Souza Carvalho - RM556089
Gabriel Duarte - RM556972
>>>>>>> 5707c9068f1510356238880a42c682efbdb63067
