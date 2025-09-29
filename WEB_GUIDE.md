# Execução Web

Guia para executar o SentinelTrack Mobile no navegador.

## Comandos

```bash
# Opção 1 (recomendada)
npm run web

# Opção 2
npx expo start --web
```

## Funcionalidades Web

- Sistema de autenticação completo
- CRUD de motocicletas
- Dashboard interativo
- Tema claro/escuro
- Navegação responsiva

### Credenciais de Teste
- Email: admin@test.com
- Senha: 123456

## Compatibilidade

Navegadores suportados:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Resolução de Problemas

### Erro de módulo não encontrado:
```bash
npx expo install react-native-web @expo/metro-runtime
```

### Porta em uso:
```bash
npx kill-port 8081
```

### Limpar cache:
```bash
npx expo start --web --clear
```
