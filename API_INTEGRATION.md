# 🔗 Configuração de Integração com Backend - SentinelTrack Mobile

## 📋 Endpoints da API

### 🔐 Autenticação

#### POST /auth/login
```json
{
  "email": "string",
  "password": "string"
}
```
**Resposta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    },
    "token": "string",
    "refreshToken": "string"
  }
}
```

#### POST /auth/register
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Resposta:** Mesma estrutura do login

#### POST /auth/logout
**Headers:** `Authorization: Bearer {token}`
**Resposta:**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

#### POST /auth/refresh
```json
{
  "refreshToken": "string"
}
```
**Resposta:**
```json
{
  "success": true,
  "data": {
    "token": "string"
  }
}
```

### 🏍️ Motocicletas

#### GET /motorcycles
**Headers:** `Authorization: Bearer {token}`
**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "model": "string",
      "plate": "string",
      "status": "active|inactive|maintenance",
      "location": {
        "address": "string",
        "latitude": "number",
        "longitude": "number"
      },
      "battery": "number",
      "lastUpdate": "string (ISO date)",
      "driver": {
        "id": "string",
        "name": "string"
      },
      "alerts": [
        {
          "id": "string",
          "type": "speed|location|battery|maintenance",
          "title": "string",
          "description": "string",
          "severity": "low|medium|high",
          "timestamp": "string (ISO date)",
          "resolved": "boolean"
        }
      ]
    }
  ]
}
```

#### GET /motorcycles/{id}
**Headers:** `Authorization: Bearer {token}`
**Resposta:** Mesma estrutura de uma moto individual

#### POST /motorcycles
**Headers:** `Authorization: Bearer {token}`
```json
{
  "model": "string",
  "plate": "string",
  "initialLocation": {
    "address": "string",
    "latitude": "number",
    "longitude": "number"
  }
}
```
**Resposta:** Motocicleta criada

#### PUT /motorcycles/{id}
**Headers:** `Authorization: Bearer {token}`
```json
{
  "model": "string",
  "plate": "string",
  "status": "active|inactive|maintenance"
}
```
**Resposta:** Motocicleta atualizada

#### DELETE /motorcycles/{id}
**Headers:** `Authorization: Bearer {token}`
**Resposta:**
```json
{
  "success": true,
  "message": "Motocicleta removida com sucesso"
}
```

### 🚨 Alertas

#### GET /alerts
**Headers:** `Authorization: Bearer {token}`
**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "speed|location|battery|maintenance",
      "title": "string",
      "description": "string",
      "severity": "low|medium|high",
      "timestamp": "string (ISO date)",
      "resolved": "boolean",
      "motorcycleId": "string"
    }
  ]
}
```

## 🔧 Configuração para Integração Real

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Para desenvolvimento com mocks
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_BASE_URL=https://api.sentineltrack.com/v1

# Para produção com backend real
# EXPO_PUBLIC_USE_MOCKS=false
# EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com/api/v1
```

### 2. Estrutura de Resposta Esperada

O backend deve retornar sempre no formato:
```json
{
  "success": boolean,
  "data": any,
  "message": "string (opcional)"
}
```

### 3. Headers Necessários

- `Content-Type: application/json`
- `Authorization: Bearer {token}` (para rotas protegidas)

### 4. Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Como Ativar Integração Real

### Opção 1: Variável de Ambiente
```bash
# No arquivo .env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com/api/v1
```

### Opção 2: Código Direto
```typescript
// Em src/services/authService.ts
const USE_MOCKS = false // Força uso da API real
```

### Opção 3: Build de Produção
```bash
# O build de produção automaticamente usa API real
npx expo build:android
npx expo build:ios
```

## 📊 Endpoints por Funcionalidade

| Funcionalidade | Endpoint | Método | Autenticação |
|----------------|----------|--------|--------------|
| Login | `/auth/login` | POST | ❌ |
| Registro | `/auth/register` | POST | ❌ |
| Logout | `/auth/logout` | POST | ✅ |
| Refresh Token | `/auth/refresh` | POST | ❌ |
| Listar Motos | `/motorcycles` | GET | ✅ |
| Detalhes Moto | `/motorcycles/{id}` | GET | ✅ |
| Criar Moto | `/motorcycles` | POST | ✅ |
| Atualizar Moto | `/motorcycles/{id}` | PUT | ✅ |
| Deletar Moto | `/motorcycles/{id}` | DELETE | ✅ |
| Listar Alertas | `/alerts` | GET | ✅ |

## 🔍 Validações Esperadas

### Autenticação
- Email deve ser válido
- Senha deve ter mínimo 6 caracteres
- Nome deve ter mínimo 2 caracteres

### Motocicletas
- Modelo obrigatório
- Placa obrigatória e única
- Localização obrigatória
- Status deve ser um dos valores válidos

### Alertas
- Tipo deve ser um dos valores válidos
- Severidade deve ser um dos valores válidos
- Timestamp deve ser ISO date válida

## 🧪 Testando a Integração

### 1. Verificar Conectividade
```bash
curl -X GET https://seu-backend.com/api/v1/health
```

### 2. Testar Login
```bash
curl -X POST https://seu-backend.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### 3. Testar com Token
```bash
curl -X GET https://seu-backend.com/api/v1/motorcycles \
  -H "Authorization: Bearer {seu-token}"
```

## 📱 Status Atual

- ✅ **Mocks funcionais** para desenvolvimento
- ✅ **API Client configurado** para integração real
- ✅ **Tratamento de erros** implementado
- ✅ **Autenticação JWT** preparada
- ✅ **Refresh token** implementado
- ✅ **Cache inteligente** para performance

---

**🔗 Pronto para integração com qualquer backend REST! 🚀**
