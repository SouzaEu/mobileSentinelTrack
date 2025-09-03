# Configuração de Ambientes - SentinelTrack Mobile

## 🔧 Configurações por Ambiente

### Desenvolvimento (Mocks)
```env
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=development
```

### Homologação (Backend de Teste)
```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=https://staging-api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=staging
```

### Produção (Backend Real)
```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=production
```

## 📁 Estrutura de Arquivos de Configuração

```
.env                    # Configuração local (não commitado)
.env.development       # Desenvolvimento com mocks
.env.staging           # Homologação
.env.production        # Produção
```

## 🚀 Scripts de Build por Ambiente

### package.json
```json
{
  "scripts": {
    "start:dev": "EXPO_PUBLIC_USE_MOCKS=true npx expo start",
    "start:staging": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://staging-api.sentineltrack.com/v1 npx expo start",
    "start:prod": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1 npx expo start",
    "build:android:staging": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://staging-api.sentineltrack.com/v1 npx expo build:android",
    "build:android:prod": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1 npx expo build:android",
    "build:ios:staging": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://staging-api.sentineltrack.com/v1 npx expo build:ios",
    "build:ios:prod": "EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1 npx expo build:ios"
  }
}
```

## 🔄 Como Alternar Entre Ambientes

### 1. Desenvolvimento (Mocks)
```bash
npm run start:dev
# ou
EXPO_PUBLIC_USE_MOCKS=true npx expo start
```

### 2. Homologação (Backend de Teste)
```bash
npm run start:staging
# ou
EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://staging-api.sentineltrack.com/v1 npx expo start
```

### 3. Produção (Backend Real)
```bash
npm run start:prod
# ou
EXPO_PUBLIC_USE_MOCKS=false EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1 npx expo start
```

## 📊 Comparação de Ambientes

| Ambiente | Mocks | API URL | Uso |
|----------|-------|---------|-----|
| Development | ✅ | Mock | Desenvolvimento local |
| Staging | ❌ | Staging | Testes e homologação |
| Production | ❌ | Production | App final |

## 🔍 Verificação de Ambiente

### No Código
```typescript
const isDevelopment = process.env.EXPO_PUBLIC_ENVIRONMENT === 'development'
const isStaging = process.env.EXPO_PUBLIC_ENVIRONMENT === 'staging'
const isProduction = process.env.EXPO_PUBLIC_ENVIRONMENT === 'production'

console.log('Ambiente atual:', process.env.EXPO_PUBLIC_ENVIRONMENT)
console.log('Usando mocks:', process.env.EXPO_PUBLIC_USE_MOCKS)
console.log('API URL:', process.env.EXPO_PUBLIC_API_BASE_URL)
```

### Debug Info
```typescript
// Adicionar em App.tsx para debug
if (__DEV__) {
  console.log('=== CONFIGURAÇÃO DO AMBIENTE ===')
  console.log('Environment:', process.env.EXPO_PUBLIC_ENVIRONMENT)
  console.log('Use Mocks:', process.env.EXPO_PUBLIC_USE_MOCKS)
  console.log('API Base URL:', process.env.EXPO_PUBLIC_API_BASE_URL)
  console.log('================================')
}
```

## 🛠️ Configuração Automática

### Criar arquivo de configuração automática
```typescript
// src/config/environment.ts
export const config = {
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
  useMocks: process.env.EXPO_PUBLIC_USE_MOCKS === 'true',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.sentineltrack.com/v1',
  isDevelopment: process.env.EXPO_PUBLIC_ENVIRONMENT === 'development',
  isStaging: process.env.EXPO_PUBLIC_ENVIRONMENT === 'staging',
  isProduction: process.env.EXPO_PUBLIC_ENVIRONMENT === 'production',
}
```

## 📱 Builds por Ambiente

### Android
```bash
# Staging
npm run build:android:staging

# Production
npm run build:android:prod
```

### iOS
```bash
# Staging
npm run build:ios:staging

# Production
npm run build:ios:prod
```

## 🔐 Segurança

### Variáveis Sensíveis
- Nunca commitar arquivos `.env` com credenciais
- Usar `.env.example` como template
- Credenciais devem vir de CI/CD

### Exemplo .env.example
```env
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1
EXPO_PUBLIC_ENVIRONMENT=development
```

---

**🔧 Configuração flexível para qualquer ambiente! 🚀**
