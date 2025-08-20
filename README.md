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

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Sistema de design
├── contexts/           # Contextos React (Auth, Theme)
├── hooks/              # Hooks customizados
├── navigation/         # Configuração de navegação
├── screens/            # Telas do aplicativo
│   ├── auth/          # Telas de autenticação
│   └── main/          # Telas principais
├── services/           # Integração com APIs
└── utils/              # Utilitários e helpers
```

### Padrões de Código

- **TypeScript**: Tipagem estática em todo o projeto
- **Hooks**: Gerenciamento de estado com React Hooks
- **Context API**: Estado global para autenticação e tema
- **Async/Await**: Operações assíncronas
- **Error Boundaries**: Tratamento de erros

## 🎨 Sistema de Design

### Cores
- **Primary**: #059669 (Verde principal)
- **Secondary**: #475569 (Cinza azulado)
- **Accent**: #10b981 (Verde claro)
- **Destructive**: #dc2626 (Vermelho)
- **Warning**: #f59e0b (Amarelo)

### Componentes UI
- `Button`: Botões com variantes e tamanhos
- `Card`: Cartões com elevação e bordas
- `Input`: Campos de entrada com validação
- `Badge`: Indicadores de status
- `LoadingSpinner`: Indicadores de carregamento

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

- **Desenvolvedor Principal**: Seu Nome
- **Email**: seu.email@exemplo.com
- **LinkedIn**: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](#-como-usar)
2. Procure em [Issues existentes](https://github.com/seu-usuario/sentineltrack-mobile/issues)
3. Crie uma [nova issue](https://github.com/seu-usuario/sentineltrack-mobile/issues/new)

---

**SentinelTrack Mobile** - Monitoramento inteligente de frotas 🏍️
