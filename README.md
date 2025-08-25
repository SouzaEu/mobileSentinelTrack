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
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto (Expo lê variáveis com prefixo EXPO_PUBLIC_):
```env
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_USE_MOCKS=true
```

### 4. Execute o projeto
```bash
# Iniciar o servidor de desenvolvimento
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web (desenvolvimento)
npm run web
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
npm start              # Inicia o servidor Expo
npm run android        # Executa no Android
npm run ios           # Executa no iOS
npm run web           # Executa no navegador

# Build
npm run build         # Build para produção
```

## 👥 Equipe

Thomaz Oliveira Vilas Boas Bartol- RM555323
Vinicius Souza Carvalho - RM556089
Gabriel Duarte - RM556972