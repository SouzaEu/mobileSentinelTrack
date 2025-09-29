# Integração com API

## Endpoints

### Autenticação

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

### Motocicletas

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

### Alertas

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

## Configuração

Para integrar com backend real, configure o arquivo `.env`:

```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com/api/v1
```

### Estrutura de Resposta

Todas as respostas devem seguir o formato:
```json
{
  "success": boolean,
  "data": any,
  "message": "string (opcional)"
}
```

## Resumo dos Endpoints

| Funcionalidade | Endpoint | Método | Autenticação |
|----------------|----------|--------|--------------|
| Login | `/auth/login` | POST | Não |
| Registro | `/auth/register` | POST | Não |
| Logout | `/auth/logout` | POST | Sim |
| Refresh Token | `/auth/refresh` | POST | Não |
| Listar Motos | `/motorcycles` | GET | Sim |
| Detalhes Moto | `/motorcycles/{id}` | GET | Sim |
| Criar Moto | `/motorcycles` | POST | Sim |
| Atualizar Moto | `/motorcycles/{id}` | PUT | Sim |
| Deletar Moto | `/motorcycles/{id}` | DELETE | Sim |
| Listar Alertas | `/alerts` | GET | Sim |
