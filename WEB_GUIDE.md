# 🌐 Como Executar o SentinelTrack na Web

## 🚀 Comandos para Web

### 1. Instalar Dependências Web (se necessário)
```bash
npx expo install react-native-web @expo/metro-runtime
```

### 2. Iniciar o Projeto na Web
```bash
npx expo start --web
```

### 3. Alternativas de Execução
```bash
# Opção 1: Iniciar e escolher web
npx expo start
# Depois pressionar 'w' para abrir no navegador

# Opção 2: Executar diretamente na web
npx expo start --web

# Opção 3: Usar npm script (se configurado)
npm run web
```

## 📱 Funcionalidades Disponíveis na Web

✅ **Sistema de Autenticação**
- Login: admin@test.com / 123456
- Cadastro de usuários
- Logout funcional

✅ **CRUD de Motocicletas**
- Criar, visualizar, editar, deletar motos
- Busca e filtros
- Indicadores de status

✅ **Sistema de Tema**
- Modo claro/escuro
- Persistência de preferências

✅ **Dashboard**
- Estatísticas em tempo real
- Alertas do sistema

## 🔧 Configurações Importantes

### Porta Padrão
- **Web:** http://localhost:8081 (ou 8082 se ocupada)
- **Metro Bundler:** http://localhost:8081

### Navegadores Suportados
- Chrome (recomendado)
- Firefox
- Safari
- Edge

### Recursos Web
- ✅ Responsividade
- ✅ Navegação por teclado
- ✅ Touch gestures (em dispositivos touch)
- ✅ PWA support (se configurado)

## 🎯 Vantagens da Versão Web

1. **Desenvolvimento Rápido**
   - Hot reload instantâneo
   - Debugging fácil
   - Ferramentas de desenvolvedor

2. **Testes**
   - Testar funcionalidades rapidamente
   - Compatibilidade cross-browser
   - Performance em diferentes dispositivos

3. **Demonstração**
   - Fácil compartilhamento via URL
   - Não precisa de emulador
   - Acesso imediato

## 📋 Checklist para Web

- [ ] Dependências web instaladas
- [ ] Servidor iniciado na porta correta
- [ ] Navegador aberto automaticamente
- [ ] Login funcionando
- [ ] CRUD de motos funcionando
- [ ] Tema claro/escuro funcionando
- [ ] Navegação entre telas funcionando

## 🚨 Solução de Problemas

### Erro: "web support but don't have the required dependencies"
```bash
npx expo install react-native-web @expo/metro-runtime
```

### Erro: "Port 8081 is being used"
- Aceite usar porta 8082
- Ou feche outros processos na porta 8081

### Erro: "Cannot find module"
```bash
npm install --legacy-peer-deps
```

---

**🌐 SentinelTrack Web** - Acessível em qualquer navegador! 🚀
